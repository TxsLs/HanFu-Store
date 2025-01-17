// var mvc = rock.initSvr(["employee"]);
// var employeeService = mvc.findService("employee");
// rock.initBasicMethod([employeeService]);

// employeeService.addPostMethod("resetPwd", true);
// employeeService.addPostMethod("addUser", true);
// employeeService.addPostMethod("updateUser", true);
// employeeService.addGetMethod("deletePhoto", true);

function loadTableData() {


  _root.loginUser(null, function (rtn, status) {
    if (rtn.hasError) {
      alert(rock.errorText(rtn, "连接到服务器失败！"));
    } else if (rtn.notNull && rtn.result.admin == 1) {

      // 销毁第一个表格实例
      $('#table').bootstrapTable('destroy');
      $('#table').bootstrapTable({
        //配置语言
        locale: 'zh-CN',
        //设置高度就可以固定表头
        // height: 500,
        //请求地址
        url: 'http://127.0.0.1:8081/hanfu/employee/queryPage',

        queryParamsType: "page",


        responseHandler: function (res) {
          var data = {};
          if (res.hasError) {
            alert(rock.errorText(res, "未登录！无法获得数据列表!"));
          }
          else {
            var ps = res.result;
            data.total = ps.totalCount;
            data.rows = ps.content;
          }
          // alert(res.data);
          return data;
        },



        //固定列功能开启
        fixedColumns: true,
        //左侧固定列数
        fixedNumber: 1,
        //右侧固定列数
        fixedRightNumber: 1,

        //是否开启分页
        pagination: true,
        //是客户端分页还是服务端分页  'client','server',由于演示没有后端提供服务，所以采用前端分页演示
        sidePagination: 'server',
        // 初始化加载第一页，默认第一页
        pageNumber: 1,
        //默认显示几条
        pageSize: 5,
        //可供选择的每页的行数 - (亲测大于1000存在渲染问题)
        pageList: [5, 10, 25, 50, 100],
        //在上百页的情况下体验较好 - 能够显示首尾页
        paginationLoop: true,
        // 展示首尾页的最小页数
        paginationPagesBySide: 2,

        // 唯一ID字段
        uniqueId: 'id',
        // 每行的唯一标识字段
        idField: 'id',
        // 是否启用点击选中行
        clickToSelect: true,
        //点击那些元素可以忽略勾选
        ignoreClickToSelectOn: ignoreClickToSelectOn,
        // 是否显示详细视图和列表视图的切换按钮
        showToggle: true,
        // 请求得到的数据类型
        dataType: 'json',
        // 请求方法
        method: 'get',
        // 工具按钮容器
        toolbar: '#toolbar',
        // 是否显示所有的列
        showColumns: true,
        // 是否显示刷新按钮
        showRefresh: true,
        // 显示图标
        showButtonIcons: true,
        // 显示文本
        showButtonText: false,
        // 显示全屏
        showFullscreen: false,
        // 开关控制分页
        showPaginationSwitch: false,
        // 总数字段
        totalField: 'total',
        // 当字段为 undefined 显示
        undefinedText: '-',
        // 排序方式
        sortOrder: "asc",
        //默认排序
        sortName: "id",
        // 按钮的类
        buttonsClass: 'light',
        // 类名前缀
        buttonsPrefix: 'btn',

        // 图标前缀
        iconsPrefix: 'bi',
        // 图标大小 undefined sm lg
        iconSize: undefined,
        // 图标的设置  这里只做了一个演示，可设置项目参考 https://examples.bootstrap-table.com/#options/table-icons.html
        icons: {
          fullscreen: 'bi-arrows-fullscreen',
        },
        // 给右上角的按钮区域增加一个自定义按钮
        buttons: function () {
          return {

            //这里只做一个示例
            collapseSearch: {
              text: 'Highlight Users',
              icon: 'bi bi-search',
              event: function () {
                $(".search-area").slideToggle();
              },
              attributes: {
                title: '折叠搜索区域'
              }
            }
          }
        },

        //头部的那个复选框选中事件
        onCheckAll: function (row) {
          batchBtnStatusHandle()
        },
        //单行选中事件
        onCheck: function (row) {
          batchBtnStatusHandle()
        },
        //单行取消选中事件
        onUncheck: function (row) {
          batchBtnStatusHandle()
        },
        //头部的那个复选框取消选中事件
        onUncheckAll: function (row) {
          batchBtnStatusHandle()
        },
        //加载模板,不改的话，默认的会超出不好看
        loadingTemplate: function () {
          return '<div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>';
        },
        onPostBody: function () {
          //重新启用弹出层,否则formatter格式化函数返回的html字符串上的tooltip提示不生效
          $('[data-bs-toggle="tooltip"]').each(function (i, el) {
            new bootstrap.Tooltip(el)
          })
        },
        onLoadSuccess: function () {
          //重新启用弹出层,否则formatter格式化函数返回的html字符串上的tooltip提示不生效
          $('[data-bs-toggle="tooltip"]').each(function (i, el) {
            new bootstrap.Tooltip(el)
          })
        },
        //params是一个对象
        queryParams: function (options) {
          var param = rock.formData($("#searchForm"));
          //var param = {};
          param.pageSize = options.pageSize;
          param.pageNum = options.pageNumber;
          param.sort = options.sortName + " " + options.sortOrder;
          param.limit = options.limit;
          param.sortOrder = options.sortOrder;
          return param;

          // return {
          //   // 每页数据量
          //   limit: options.limit,
          //   // sql语句起始索引
          //   offset: options.offset,
          //   page: (options.offset / options.limit) + 1,
          //   // 排序的列名
          //   sort: options.sort,
          //   // 排序方式 'asc' 'desc'
          //   sortOrder: options.order,
          //   //关键词
          //   keywords: $('input[name=keyword]').val(),
          //   //开始时间
          //   beginTime: $('#joinTime').val(),
          //   //结束时间
          //   // endTime: $('#endTime').val(),  
          //   pageSize: options.pageSize,
          //   pageNum: options.pageNumber,
          //   sort: options.sortName + " " + options.sortOrder,
          //   //param: rock.formData($("#searchForm"))
          // }
        },
        //列
        columns: [
          {
            checkbox: true,
            //是否显示该列
            visible: true,
          },
          {
            title: '用户ID',
            field: 'id',
            // 使用[align]，[halign]和[valign]选项来设置列和它们的标题的对齐方式。h表示横向，v标识垂直
            align: 'center',
            // 是否作为排序列
            sortable: true,
            // 当列名称与实际名称不一致时可用
            // sortName: 'id',
            switchable: false,
            // 列的宽度
            width: 8,
            // 宽度单位
            widthUnit: 'rem'
          },
          {
            title: '账号',
            field: 'code',
            align: 'center',
            sortable: true,
          },
          {
            title: '名称',
            field: 'name',
            align: 'center',
            sortable: true,
          },

          {
            title: '用户角色',
            field: 'admin',
            align: 'center',
            sortable: true,
            formatter: function (value) {
              return value == 1 ? "超级管理员" : "商城员工";
            },
          },
          {
            title: '性别',
            field: 'gender',
            align: 'center',
            sortable: true,
            formatter: function (value) {
              return value == 1 ? "男" : "女";
            },
          },

          {
            title: '注册时间',
            field: 'joinTime',
            align: 'center',
            sortable: true,
            formatter: function (value) {
              // 使用 Date 对象将 value 转换为日期时间
              var datetime = new Date(value);

              // 获取年、月、日、小时、分钟、秒
              var year = datetime.getFullYear();
              var month = String(datetime.getMonth() + 1).padStart(2, '0');
              var day = String(datetime.getDate()).padStart(2, '0');
              var hour = String(datetime.getHours()).padStart(2, '0');
              var minute = String(datetime.getMinutes()).padStart(2, '0');
              var second = String(datetime.getSeconds()).padStart(2, '0');

              // 返回格式化后的日期时间字符串
              return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            }
          },
          {
            title: '手机号',
            field: 'phone',
            align: 'center',
            sortable: true,
          },


          {
            title: '用户状态',
            field: 'status',
            align: 'center',
            sortable: true,
            formatter: formatStatus,
            // events: {
            //   'click .form-switch': function (event, value, row, index) {
            //     event.preventDefault();
            //     event.stopPropagation();

            //     //获取当前状态
            //     let $checkbox = $(event.target);
            //     $checkbox.prop('disabled', true);
            //     //获取即将去往的选中状态
            //     // let status = $checkbox.prop('checked');

            //     // // 判断选中行的 id 是否为 1，如果是则不允许修改
            //     // if (row.admin === 1) {
            //     //   // 将状态复选框设为不选中状态
            //     //   $checkbox.prop('disabled', true);
            //     //   // 返回，不执行修改操作
            //     //   return;
            //     // }

            //     //发送ajax改变用户的状态

            //     // $.ajax({
            //     //   url: `/userChangeStatus/${row.id}`,
            //     //   method: 'get',
            //     // }).then(response => {
            //     //   if (response.code === 200) {
            //     //     //修改状态
            //     //     $checkbox.prop('checked', status);
            //     //     //给出通知
            //     //     $.toasts({
            //     //       type: 'success',
            //     //       placement: 'top-center',
            //     //       content: '操作成功',
            //     //     })
            //     //   }
            //     // });

            //   }
            // }

          },

          {
            title: '操作',
            align: 'center',
            formatter: formatAction,
            events: {
              'click .edit-btn': function (event, value, row, index) {
                event.stopPropagation();

                window.modalInstance = $.modal({
                  onShow: function () {
                    // 将所选行的数据存储到 sessionStorage
                    sessionStorage.setItem('selectedUserData', JSON.stringify(row));
                  },
                  url: 'user-edit.html',
                  title: '编辑用户信息',
                  //禁用掉底部的按钮区域
                  buttons: [],
                  modalDialogClass: 'modal-dialog-centered modal-lg',
                  onHidden: function (obj, data) {
                    if (data === true) {
                      //刷新当前数据表格
                      $('#table').bootstrapTable('refresh');
                      $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
                    }
                    // 使用完数据后清除 sessionStorage 中的数据
                    sessionStorage.removeItem('selectedUserData');
                  }
                });

              },
              'click .del-btn': function (event, value, row, index) {
                event.stopPropagation();
                window.modalInstance = $.modal({

                  onShow: function () {
                    // 将所选行的数据存储到 sessionStorage
                    sessionStorage.setItem('selectedUserData', JSON.stringify(row));
                  },
                  url: 'ban.html',
                  title: '封禁用户',
                  //禁用掉底部的按钮区域
                  buttons: [],
                  modalDialogClass: 'modal-dialog-centered modal-lg',
                  onHidden: function (obj, data) {
                    if (data === true) {
                      //刷新当前数据表格
                      $('#table').bootstrapTable('refresh');
                      $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
                    }
                    // 使用完数据后清除 sessionStorage 中的数据
                    sessionStorage.removeItem('selectedUserData');
                  }

                })

              },

              'click .unlock-btn': function (event, value, row, index) {
                event.stopPropagation();

                $.ajax({
                  //跨域
                  xhrFields: {
                    withCredentials: true
                  },
                  //url: 'http://127.0.0.1:8080/hanfu/ban/queryByName?propName=userId&propValue=' + encodeURIComponent(row.id),
                  url: 'http://127.0.0.1:8081/hanfu/ban/queryByBanId',
                  method: 'get',
                  data: {
                    userId: row.id,
                    type: 1
                  },
                }).then(response => {

                  //用数组在取出时单个的reason不会拆开
                  var reasons = [];
                  response.result.forEach(ban => {
                    //reasons += ban.reason;
                    reasons.push(ban.reason);
                  });


                  // var times = '';
                  // response.result.forEach(ban => {
                  //   times += ban.beginTime ;
                  // });
                  // console.log(times)

                  // 遍历所有 Ban 对象，将 beginTime 格式化为日期时间字符串
                  var formattedBeginTimes = response.result.map(ban => {
                    // 将时间戳转换为 Date 对象
                    var beginTime = new Date(ban.beginTime);
                    // 使用 Intl.DateTimeFormat 对象进行格式化
                    var formattedBeginTime = new Intl.DateTimeFormat('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(beginTime);
                    return formattedBeginTime;
                  });

                  // 将格式化后的 beginTime 数组和 reasons 字符串连接起来
                  var bodyContent = '';
                  for (var i = 0; i < formattedBeginTimes.length; i++) {
                    bodyContent += '封禁日期：' + formattedBeginTimes[i] + '<br>';
                    bodyContent += '封禁理由：' + reasons[i] + '<br><br>';
                  }
                  // // 将时间戳转换为 Date 对象
                  // var beginTime = new Date(times);
                  // // 使用日期时间格式函数格式化日期时间
                  // var formattedBeginTime = beginTime.getFullYear() + '-' + (beginTime.getMonth() + 1) + '-' + beginTime.getDate() + ' ' +
                  //   beginTime.getHours() + ':' + beginTime.getMinutes() + ':' + beginTime.getSeconds();

                  window.modalInstance = $.modal({

                    body: '确定要解封此用户:\n' + row.code + '&nbsp??' + '<br><br>' + '此用户已被封禁\n' + response.result.length + '\n次' + '<br><br>' + bodyContent,

                    cancelBtn: true,

                    ok: function () {
                      $.ajax({
                        //跨域
                        xhrFields: {
                          withCredentials: true
                        },
                        url: 'http://127.0.0.1:8081/hanfu/employee/updateEmployee',
                        method: 'post',
                        data: { status: 1, id: row.id },
                      }).then(response => {
                        if (response.result) {
                          $.toasts({
                            type: 'success',
                            content: '解封成功！',
                            delay: 1500,
                            onHidden: function () {
                              //刷新当前数据表格
                              $('#table').bootstrapTable('refresh');
                              $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
                            }
                          })
                        }
                      });

                    }, cancel: function () {
                      //刷新当前数据表格
                      $('#table').bootstrapTable('refresh');
                      $('#table').bootstrapTable('selectPage', 1)//跳转到第一页

                    }


                  })


                });



              },

              'click .role-btn': function (event, value, row, index) {
                event.stopPropagation();

                window.rolemodal = $.modal({
                  onShow: function () {
                    // 将所选行的数据存储到 sessionStorage
                    sessionStorage.setItem('selectedUserData', JSON.stringify(row));
                  },
                  url: 'user-resetPwd.html',
                  title: '重置用户密码',
                  //禁用掉底部的按钮区域
                  buttons: [],
                  modalDialogClass: 'modal-dialog-centered modal-lg',
                  onHidden: function (obj, data) {
                    if (data === true) {
                      //刷新当前数据表格
                      $('#table').bootstrapTable('refresh');
                      $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
                    }
                    // 使用完数据后清除 sessionStorage 中的数据
                    sessionStorage.removeItem('selectedUserData');
                  }
                })

              }
            }
          }
        ]
      });






      //批量处理
      // $('.batch-btn').on('click', function () {
      //   //获取所有选中行的id
      //   let id = [];
      //   let rowSelected = $("#table").bootstrapTable('getSelections');
      //   $.each(rowSelected, function (index, row) {
      //     id.push(row.id);
      //   })

      //   //发送ajax
      //   $.modal({
      //     body: '确定要删除所选用户吗?',
      //     ok: function () {
      //       $.ajax({
      //         url: '/user/10',
      //         method: 'delete',
      //         data: { id },
      //       }).then(response => {
      //         if (response.code === 200) {
      //           $.toasts({
      //             type: 'success',
      //             delay: 1500,
      //             content: '删除成功',
      //             onHidden: function () {

      //               $('#table').bootstrapTable('refresh');
      //               $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
      //               //把批量删除按钮变成禁止点击
      //               $('.batch-btn').attr('disabled', true)
      //             }
      //           })
      //         }
      //       });
      //     }
      //   })
      // })


      function ignoreClickToSelectOn(e) {
        return $(e).hasClass('form-check-input');
      }


      //处理批量按钮的disabled状态
      function batchBtnStatusHandle() {
        let rowSelected = $("#table").bootstrapTable('getSelections');
        if (rowSelected.length > 0) {
          $('.batch-btn').attr('disabled', false)
        } else {
          $('.batch-btn').attr('disabled', true)
        }
      }


      function formatRole(val, rows) {
        switch (val) {
          case 1:
            return '经理'
          case 2:
            return '组长'
          case 3:
            return '研发组长'
          case 4:
            return '客服'
          case 5:
            return '文章审核员'
          case 6:
            return '销售'
          default:
            return '<span class="badge text-bg-danger">未分配</span>'
        }

      }

      function formatGender(val, rows) {
        return val === true ? '男' : '女';
      }

      // 格式化列数据演示 val:当前数据 rows:当前整行数据
      function formatStatus(val, rows) {
        return rows.status === 1 ? '<span class="badge text-bg-success">正常</span>' : '<span class="badge text-bg-danger">离职</span>';

        //         let uncheck = `<div class="form-check form-switch">
        // <input class="form-check-input bsa-cursor-pointer" type="checkbox" disabled>离职</div>`;

        //         let checked = `<div class="form-check form-switch">
        // <input class="form-check-input bsa-cursor-pointer" type="checkbox" checked disabled>正常</div>`

        //         return val === 1 ? checked : uncheck;


      }


      //格式化列数据演示 val:当前数据 rows:当前整行数据
      function formatAction(val, rows) {

        let html = '';
        if (rows.admin == 1) {
          html += `<button disabled type="button" class="btn btn-light btn-sm edit-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="编辑用户信息"><i class="bi bi-pencil"></i></button>`;
          html += `<button disabled type="button" class="btn btn-light mx-1 btn-sm del-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="封禁？"><i class="bi bi-lock-fill"></i></button>`
          html += `<button disabled type="button" class="btn btn-light btn-sm role-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="重置密码"><i class="bi bi-key-fill"></i></button>`
        } else if (rows.status == 1) {

          //第一个按钮(你可以在这里判断用户是否有修改权限来决定是否显示)
          html += `<button type="button" class="btn btn-light btn-sm edit-btn" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="编辑用户信息"><i class="bi bi-pencil"></i></button>`;

          //第二个按钮
          html += `<button type="button" class="btn btn-light mx-1 btn-sm del-btn" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="封禁该用户"><i class="bi bi-lock-fill"></i></button>`


          //第三个按钮
          html += `<button type="button" class="btn btn-light btn-sm role-btn" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="重置密码"><i class="bi bi-key-fill"></i></button>`
        } else {
          //第一个按钮(你可以在这里判断用户是否有修改权限来决定是否显示)
          html += `<button disabled type="button" class="btn btn-light btn-sm edit-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="编辑用户信息"><i class="bi bi-pencil"></i></button>`;

          //第二个按钮
          html += `<button type="button" class="btn btn-light mx-1 btn-sm unlock-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="解除封禁"><i class="bi bi-unlock-fill"></i></button>`


          //第三个按钮
          html += `<button disabled type="button" class="btn btn-light btn-sm role-btn" data-bs-toggle="tooltip" data-bs-placement="top"
  data-bs-title="重置密码"><i class="bi bi-key-fill"></i></button>`

        }
        return html;
      }

      //搜索处理
      $('.bsa-querySearch-btn').on('click', function () {
        $('#table').bootstrapTable('refresh');
        $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
      })

      //重置处理
      $('.bsa-reset-btn').on('click', function () {

        //把所有的字段都恢复默认值
        $('#name').val('');
        $('#phone').val('');
        $('#joinTime').val('');
        $('#endTime').val('');
        $('#status').selectpicker('val', ['']).trigger("change");
        $('#admin').selectpicker('val', ['']).trigger("change");
        //刷新回到第一页
        $('#table').bootstrapTable('refresh');
        $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
      })

      //==============================日期时间插件====================================


      //日期时间的翻译，由于该插件没有内置中文翻译，需要手动通过选项进行翻译
      let td_zh = {
        today: '回到今天',
        clear: '清除选择',
        close: '关闭选取器',
        selectMonth: '选择月份',
        previousMonth: '上个月',
        nextMonth: '下个月',
        selectYear: '选择年份',
        previousYear: '上一年',
        nextYear: '下一年',
        selectDecade: '选择十年',
        previousDecade: '上一个十年',
        nextDecade: '下一个十年',
        previousCentury: '上一个世纪',
        nextCentury: '下一个世纪',
        pickHour: '选取时间',
        incrementHour: '增量小时',
        decrementHour: '递减小时',
        pickMinute: '选取分钟',
        incrementMinute: '增量分钟',
        decrementMinute: '递减分钟',
        pickSecond: '选取秒',
        incrementSecond: '增量秒',
        decrementSecond: '递减秒',
        toggleMeridiem: '切换上下午',
        selectTime: '选择时间',
        selectDate: '选择日期',
      }

      //自定义日期格式插件
      let td6 = new tempusDominus.TempusDominus(document.getElementById('joinTime'), {
        //本地化控制
        localization: {
          ...td_zh,//展开语法
          format: 'yyyy-MM-dd HH:mm:ss',
        },
        //布局控制
        display: {
          //视图模式(选择年份视图最先开始)
          viewMode: 'calendar',
          components: {
            //是否开启日历，false:则是时刻模式
            calendar: true,
            //支持年份选择
            year: true,
            //是否开启月份选择
            month: true,
            //支持日期选择
            date: true,
            //底部按钮中那个时刻选择是否启用，false则表示隐藏，下面三个需要该选项为true时有效
            clock: true,
            //时
            hours: true,
            //分
            minutes: true,
            //秒
            seconds: true
          },
          //图标
          icons: {
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x',
          },
          //视图底部按钮
          buttons: {
            today: true,
            clear: true,
            close: true,
          },
        }
      });

      let td7 = new tempusDominus.TempusDominus(document.getElementById('endTime'), {
        //本地化控制
        localization: {
          ...td_zh,//展开语法
          format: 'yyyy-MM-dd HH:mm:ss',
          //是否使用24小时制,比如3.15分会变成15.15
          // hourCycle: 'h24'
        },
        //布局控制
        display: {
          //视图模式(选择年份视图最先开始)
          viewMode: 'calendar',
          components: {
            //是否开启日历，false:则是时刻模式
            calendar: true,
            //支持年份选择
            year: true,
            //是否开启月份选择
            month: true,
            //支持日期选择
            date: true,
            //底部按钮中那个时刻选择是否启用，false则表示隐藏，下面三个需要该选项为true时有效
            clock: true,
            //时
            hours: true,
            //分
            minutes: true,
            //秒
            seconds: true
          },
          //图标
          icons: {
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x',
          },
          //视图底部按钮
          buttons: {
            today: true,
            clear: true,
            close: true,
          },
        }
      });


      //事件监听设定起始时间为td7实例的选中时间
      td6.subscribe(tempusDominus.Namespace.events.change, (e) => {
        td7.updateOptions({
          restrictions: {
            minDate: e.date,
          },
        });
      });
      //事件监听设定起始时间为td6实例的选中时间
      td7.subscribe(tempusDominus.Namespace.events.change, (e) => {
        td6.updateOptions({
          restrictions: {
            maxDate: e.date,
          },
        });
      });

      //下拉框美化插件，原生的bootstrap它会调用系统的那个下拉菜单
      $('select').selectpicker();

    } else {
      $.toasts({
        type: 'danger',
        content: '未登录,或没有权限！',
        delay: 3300,
        onHidden: function () {
          top.location.replace('login.html');
        }
      })
    }
  })


}

$(document).ready(function () {

  // 新增用户
  $('.add-btn').on('click', function () {
    // window :建议加上该前缀,否则在子页面中通过parent.modalInstance 获取不到该实例对象,因为它现在处于一个匿名函数里
    window.modalInstance = $.modal({
      url: 'user-add.html',
      title: '新增员工',
      //禁用掉底部的按钮区域
      buttons: [],
      modalDialogClass: 'modal-dialog-centered modal-lg',
      onHidden: function (obj, data) {
        if (data === true) {
          //刷新当前数据表格
          $('#table').bootstrapTable('refresh');
          $('#table').bootstrapTable('selectPage', 1)//跳转到第一页
        }
      }
    })
  })

  loadTableData();




  /**
   * columns表示列，里面的对象 title是表头信息，field是服务端返回的字段名称
   * 1.不做分页，返回的数据格式是 [{},{}]
   * 2.如果要开启分页，需要配置pagination:true, sidePagination:'client|server'
   * 3.客户端分页所需要的格式和不做分页时是一样的 都是 :[{},{}]
   * 4.服务端分页返回的格式为：{rows:[{},{}],total:200}
   * 参考：https://github.com/wenzhixin/bootstrap-table-examples/blob/master/json/data2.json
   */



});
