(function($){
    var ActionManager = {};//ajax序列
    $.loadShow = function () {
        var loadNode = $('<div>', {'id': 'loadingBox'});
        loadNode.appendTo(document.body);
        loadNode.html('<div id="loadingBox"><img src="../../resources/images/loading.gif"></div>');
        var loadOver = $('#loadOver');
        if (loadOver.length === 0) {
            loadOver = $("<div />", {id: "loadOver"})
        }
        loadOver[0].style.cssText = "width:100%;height:" + $(document).height() + "px;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0.8);z-index:100;";
        loadOver.appendTo(document.body);
        $.popup(loadNode)
        //$.showPop(loadNode,true);
        //loadNode.css('top','45%')
    };

    $.loadHide = function () {
        $('#loadingBox').remove();
        $('#loadOver').remove();
    }
    $.modalHide = function () {
        $("#myModal").modal("hide");
    };
    $.formatDateTime = function (strTime) {
        if(null == strTime) return '';
        if(typeof strTime=== 'string' && strTime.indexOf(':')!=-1) return strTime;
        var daTe = new Date(strTime);
        var year = daTe.getFullYear();
        var month = daTe.getMonth() + 1 < 10 ? "0" + (daTe.getMonth() + 1) : daTe.getMonth() + 1;
        var date = daTe.getDate() < 10 ? "0" + daTe.getDate() : daTe.getDate();
        var hour = daTe.getHours() < 10 ? "0" + daTe.getHours() : daTe.getHours();
        var minute = daTe.getMinutes() < 10 ? "0" + daTe.getMinutes() : daTe.getMinutes();
        var second = daTe.getSeconds() < 10 ? "0" + daTe.getSeconds() : daTe.getSeconds();
        return year + "-" + month + "-" + date + ' ' + hour + ':' + minute + ':' + second;
    };
    $.formatDate = function (strTime) {
        if(null == strTime) return '';
        if(strTime.indexOf(':')!=-1) return strTime.substr(0,10);
        var daTe = new Date(strTime);
        var year = daTe.getFullYear();
        var month = daTe.getMonth() + 1 < 10 ? "0" + (daTe.getMonth() + 1) : daTe.getMonth() + 1;
        var date = daTe.getDate() < 10 ? "0" + daTe.getDate() : daTe.getDate();
        return year + "-" + month + "-" + date;
    };
    
    $.reloadCaptcha=function(ele){
        $(ele).click(function(){
            var cImg=$(this).find('#captchaImg');
            var _src=cImg.attr('src');
            cImg.attr('src',_src+'?t='+Math.random(5))
        })
    }
    $.commHeader = function (activeIndex) {
        // var result = getCookie('result');
        // if (result != null && result != "") {
        //     result = JSON.parse(result);
        // } else {
        //     window.location.href = "../../admin/login/login.html";
        // }
        var header='<header class="am-topbar am-topbar-inverse admin-header">'+
                '<div class="am-topbar-brand">'+
                    '<a href="javascript:;" class="tpl-logo">'+
                        '<img src="assets/img/logo.png" alt="">'+
                    '</a>'+
                '</div>'+
                '<div class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right"></div>'+
                '<button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse={target: "#topbar-collapse"}><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>'+
                '<div class="am-collapse am-topbar-collapse" id="topbar-collapse">'+
                    '<ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">'+
                        '<li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>'+
                            '<ul class="am-dropdown-content">'+
                                '<li><a href="#"><span class="am-icon-power-off"></span> 退出</a></li>'+
                            '</ul>'+
                        '</li>'+
                        '<li><a href="###" class="tpl-header-list-link"><span class="am-icon-sign-out tpl-header-list-ico-out-size"></span></a></li>'+
                    '</ul>'+
                '</div>'+
            '</header>';
        $('#headWrapper').html(header);
        // $("#logout").click(function () {
        //     clearCookie("loginCookieKey");
        //     clearCookie("result");
        //     window.location.href = "../../admin/login/login.html";
        // });
        var nav='<div class="tpl-left-nav tpl-left-nav-hover">'+
            '<div class="tpl-left-nav-title">导航列表</div>'+
            '<div class="tpl-left-nav-list">'+
                '<ul class="tpl-left-nav-menu">'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=companyInfo href="companyInfo.html" class="nav-link ">'+
                            '<span>公司信息</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a  data-index=createSchool href="createSchool.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>添加校区</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=createCourse href="createCourse.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>添加课程</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=schoolList href="schoolList.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>校区一览</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=courseList href="courseList.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>课程一览</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=bookingManage href="bookingManage.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>预约管理</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=sendMessage href="sendMessage.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>收发消息</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a data-index=accountDetail href="accountDetail.html" class="nav-link tpl-left-nav-link-list">'+
                            '<span>账户明细</span>'+
                        '</a>'+
                    '</li>'+
                    '<li class="tpl-left-nav-item">'+
                        '<a href="login.html" class="nav-link tpl-left-nav-link-list">'+
                            '<i class="am-icon-key"></i>'+
                            '<span>登录</span>'+
                        '</a>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
        '</div>';
        $('#navWapper').html(nav);
        var activeIndex=activeIndex||'';
        $('.nav-link[data-index='+activeIndex+']').addClass('active');
    },
        $.succFn = function (data, realFn) {
            $.loadHide();
            if (data.resCode == 0000) {
                realFn(data);
            } else if (data.resCode == 9000) {
                window.location.href = "../../admin/login/login.html";
            } else if (data.resCode == 1111) {
                $.alert(data.resDesc + data.result);
            } else {
                $.alert(data.resDesc);
            }
        },
        
    $.popup = function (ele) {
        if (typeof ele === 'string' || typeof ele === 'object')var oalertArea = $(ele);
        else return false;
        var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度
            _windowHeight = $(window).height(),//获取当前窗口高度
            _windowWidth = $(window).width(),//获取当前窗口宽度
            _popupHeight = oalertArea.height(),//获取弹出层高度
            _popupWeight = oalertArea.width();//获取弹出层宽度
        _posiTop = (_windowHeight - _popupHeight) / 2 + _scrollHeight;
        _posiLeft = (_windowWidth - _popupWeight) / 2;
        oalertArea.css({'position': 'absolute', 'display': 'block', 'top': _posiTop, 'left': _posiLeft});
    };
    $.showPop = function (ele, close) {//close若为true，不添加关闭按钮
        var oalertArea = $(ele);
        if (0 === oalertArea.length)return false;
        var oclose = oalertArea.find('.pop_close');
        if (!close) {
            oclose = $("<div />", {
                css: {
                    'position': 'absolute',
                    'width': '24px',
                    'height': '24px',
                    'border-radius': '50%',
                    'right': '20px',
                    'margin-left': '-25px',
                    'top': '10px',
                    'cursor': 'pointer'
                }
            });
            var close01 = $('<span />', {
                css: {
                    "content": "''",
                    "position": "absolute",
                    "width": "30px",
                    "height": "0",
                    "border-top": "1px solid #000",
                    "left": "50%",
                    "margin-left": "-15px",
                    "top": "50%",
                    "margin-top": "-1px",
                    "transform": "rotate(45deg)",
                    "-webkit-transform": "rotate(45deg)"
                }
            });
            var close02 = $('<span />', {
                css: {
                    "content": "''",
                    "position": "absolute",
                    "width": "30px",
                    "height": "0",
                    "border-top": "1px solid #000",
                    "left": "50%",
                    "margin-left": "-15px",
                    "top": "50%",
                    "margin-top": "-1px",
                    "transform": "rotate(-45deg)",
                    "-webkit-transform": "rotate(-45deg)"
                }
            });
            oclose.append(close01);
            oclose.append(close02);
            oclose.appendTo(oalertArea);
        }
        var el1 = $('#alertOver');
        if (el1.length === 0) {
            el1 = $("<div />", {id: "alertOver"})
        }
        el1[0].style.cssText = "width:100%;height:" + $(document).height() + "px;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0.8);z-index:98;text-align:right";
        el1.appendTo(document.body);
        oalertArea.css('display', 'block');
        $.popup(ele)
        if (parseInt(oalertArea.css('z-index')) && parseInt(oalertArea.css('z-index')) <= 98)oalertArea.css('z-index', '99');
        var closeFuc = function () {
            oalertArea.css({'display': 'none'});
            el1.remove();
        };
        oclose.on('click', function () {
            closeFuc();
        });
        $('.js_pop_btn_cancel').on('click', function () {
            closeFuc();
        });
    };
    
    $.toThousands = function (num) {
        var num = (num || 0).toString().split('.'), result = '';
        var num0 = num[0];
        while (num0.length > 3) {
            result = ',' + num0.slice(-3) + result;
            num0 = num0.slice(0, num0.length - 3);
        }
        if (num.length > 1) {
            if (num[1].length === 1)num[1] += '0';
            result = num0 + result + '.' + num[1];
        }
        else {
            result = num0 + result + '.00';
        }
        return result;
    };
    $.jsonSort = function (obj) {//key排序
        var a = [];
        $.each(obj, function (key, val) {
            a[a.length] = key;
        });
        a.sort();
        return a;
    }
    $.renderSelect = function (jsonData, ele, option) {//option为一个{}，defaultOption暂无value值
        var str = "";
        option = option || {};

        if (option.sort) {
            var keys = $.jsonSort(jsonData);
            $.each(keys, function (index, item) {
                if (option.defaultKey && option.defaultKey === item) {
                    str += '<option value=' + option.defaultKey + ' selected>' + jsonData[option.defaultKey] + '</option>';
                }
                else str += '<option value=' + item + '>' + jsonData[item] + '</option>';
            });
        }
        else {
            $.each(jsonData, function (index, item) {
                if (option.defaultKey && option.defaultKey === index) {
                    str += '<option value=' + option.defaultKey + ' selected>' + jsonData[option.defaultKey] + '</option>';
                }
                else str += '<option value=' + index + '>' + item + '</option>';
            });
        }

        if (option.defaultOption) {
            str = '<option value="">' + option.defaultOption + '</option>' + str;
        }
        $(ele).html(str);
    }
    $.serialize = function (ele) {//表单处理，返回json{}
        var obj = {}, element = $(ele);
        element.find("input").each(function () {
            if ($(this).val() === '')return;
            if ($(this).prop("type") === 'radio') {
                if ($(this).is(":checked")) {
                    if ($(this).attr("name"))obj[$(this).attr("name")] = $(this).val();
                }
            } else if ($(this).prop("type") === 'checkbox') {
                if(!$(this).attr('checked'))return;
                if (obj[$(this).attr('name')]) {
                    obj[$(this).attr("name")].push($(this).val());
                } else {
                    var _a = [];
                    _a.push($(this).val());
                    obj[$(this).attr('name')] = _a;
                }
            } else {
                if ($(this).attr("name")) obj[$(this).attr("name")] = $(this).val();
            }
        });
        element.find("select").each(function () {
            if ($(this).val() === '' || $(this).val() === null)return;
            obj[$(this).attr("name")] = $(this).val();
        });
        element.find("textarea").each(function () {
            if ($(this).val() === '')return;
            obj[$(this).attr("name")] = $(this).val();
        });
        $.each(obj,function(index,item){
            if(item instanceof(Array)){
                obj[index]=item.join(',');
            }
        });
        return obj;
    }
    $.isRole = function (role) {
        var cookie = getCookie('result');
        if (!cookie)return;
        if (typeof role !== 'string')return;
        return JSON.parse(cookie).roles.indexOf(role)!==-1;
    }
   
    //删除json空项
    $.deleteEmptyJsonItem=function(json){
        for(var i in json){
            if(!json[i] && json[i]!==0){
                delete json[i]
            }
        }
        return json;
    }

    $.getCurrentUser = function () {
        return JSON.parse(getCookie('result'));
    }

    if($.fn.datetimepicker)$.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今日",
        suffix: [],
        meridiem: ["上午", "下午"]
    };
})(jQuery)
    