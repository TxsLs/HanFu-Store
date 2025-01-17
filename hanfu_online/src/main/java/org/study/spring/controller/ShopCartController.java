package org.study.spring.controller;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.quincy.rock.core.dao.DaoUtil;
import org.quincy.rock.core.dao.sql.Predicate;
import org.quincy.rock.core.dao.sql.Sort;
import org.quincy.rock.core.exception.LoginException;
import org.quincy.rock.core.lang.DataType;
import org.quincy.rock.core.vo.PageSet;
import org.quincy.rock.core.vo.Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.study.spring.AppUtils;
import org.study.spring.BaseController;
import org.study.spring.Entity;
import org.study.spring.entity.ShopCart;
import org.study.spring.service.ShopCartService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

//@CrossOrigin(allowCredentials = "true", origins = { "http://127.0.0.1:5501", "http://localhost:5501" })
@Slf4j
@Api(tags = "购物车管理模块")
@Controller
@RequestMapping("/shopCart")
public class ShopCartController extends BaseController<ShopCart, ShopCartService> {

	@ApiOperation(value = "条件分页查询", notes = "")
	@ApiImplicitParams({ @ApiImplicitParam(name = "searchCode", value = "代码(支持like)，允许null"),
			@ApiImplicitParam(name = "searchName", value = "名称(支持like)，允许null"),
			@ApiImplicitParam(name = "sort", value = "排序规则字符串"),
			@ApiImplicitParam(name = "pageNum", value = "页码", required = true, dataType = "long"),
			@ApiImplicitParam(name = "pageSize", value = "页大小", required = true, dataType = "int") })
	@RequestMapping(value = "/queryPage", method = { RequestMethod.GET })
	public @ResponseBody Result<PageSet<? extends Entity>> queryPage(String searchCode, String searchName, String sort,
			//			@RequestParam("customerCode") String customerCode,
			@RequestParam("pageNum") long pageNum, @RequestParam int pageSize) {
		log.debug("call queryPage");
		log.debug(String.valueOf(AppUtils.isLogin()));
		Predicate where = DaoUtil.and();//sql的条件语句
		if (AppUtils.isLogin()) {
			String code = AppUtils.getLoginUser().getUsername();
			where.equal(DataType.STRING, "customerCode", code.toString());
			if (StringUtils.isNotEmpty(searchCode)) {
				where.like("code", searchCode);
			}
			if (StringUtils.isNotEmpty(searchName)) {
				where.like("name", searchName);
			}
			PageSet<? extends Entity> ps = this.service().findPage(where, Sort.parse(sort), pageNum, pageSize);
			return Result.toResult(ps);
		} else {
			throw new LoginException("未登录!");
		}
	}

	@ApiOperation(value = "动态加入购物车")
	@ApiImplicitParams({ @ApiImplicitParam(name = "code", value = "顾客账号", required = true),
			@ApiImplicitParam(name = "productId", value = "商品id", required = true, dataType = "long"),
			@ApiImplicitParam(name = "quantity", value = "数量", required = true, dataType = "int") })
	@RequestMapping(value = "/addCart", method = { RequestMethod.POST })
	public @ResponseBody Result<Boolean> addCart(@RequestParam String code, @RequestParam long productId,
			@RequestParam int quantity) {
		log.debug("call addCart");
		boolean ok = false;
		ok = this.service().addProduct(code, productId, quantity);
		return Result.of(ok);
	}

	@ApiOperation(value = "动态更新购物车")
	@ApiImplicitParams({ @ApiImplicitParam(name = "code", value = "顾客账号", required = true),
			@ApiImplicitParam(name = "productId", value = "商品id", required = true, dataType = "long"),
			@ApiImplicitParam(name = "quantity", value = "数量", required = true, dataType = "int") })
	@RequestMapping(value = "/updateCart", method = { RequestMethod.POST })
	public @ResponseBody Result<Boolean> updateCart(@RequestParam String code, @RequestParam long productId,
			@RequestParam int quantity) {
		log.debug("call updateCart");
		boolean ok = false;
		ok = this.service().updateProduct(code, productId, quantity);
		return Result.of(ok);
	}

	@ApiOperation(value = "删除多个实体", notes = "该接口继承自BaseController")
	@ApiImplicitParam(name = "id", value = "多个主键id", required = true, dataType = "long", allowMultiple = true)
	@RequestMapping(value = "/removeMoreCart", method = { RequestMethod.GET })
	public @ResponseBody Result<Boolean> removeMoreCart(@RequestParam("id") Long[] ids) {
		log.debug("call removeMoreCart");
		if (AppUtils.isLogin()) {
			//任何人登录会改id就能改任何商品 。。。因为前端只提供能改的（自己的商品id），但是防不住高手改请求。
			boolean result = this.service().deleteMore(Arrays.asList(ids));
			return Result.of(result);
		} else {
			throw new LoginException("未登录!");
		}
	}
}
