/**
 * 
 utils for fanpiao web projects
 version:'0.1'
 Date: 2016-08-03
*/
;(function($){ 
    $.fanUtils = {       
    	//设置cookie
		setCookie:function(name, value, day,path) {
		    var path=path || '/';
		    var expiration = new Date((new Date()).getTime() + day * 24 * 3600 * 1000);
		    document.cookie = name
		    + "="
		    + escape(value)
		    + ";path="+path+"; expires=" + expiration
		        .toGMTString();
		},
		//获取cookie
		getCookie:function (cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for (var i = 0; i < ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') c = c.substring(1);
		        if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
		    }
		    return "";
		},
		//清除cookie
		clearCookie:function (name) {
		    setCookie(name, "", -1);
		},
		//获取url参数对象
		getRequest:function () {
		    var url = location.search; //获取url中"?"符后的字串
		    var theRequest = new Object();
		    if (url.indexOf("?") != -1) {
		        var str = url.substr(1);
		        var strs = str.split("&");
		        for (var i = 0; i < strs.length; i++) {
		            var srtArry = strs[i].split("=");
		            var y = srtArry.shift();
		            theRequest[y] = unescape(srtArry.join('='));
		        }
		    }
		    return theRequest;
		},
		toThousands:function (num) {
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
		},
		toThousandsArray:function (array) {
		    if ($.isArray(array)) {
		        var returnArray = [];
		        $.each(array, function (i, t) {
		            returnArray.push($.fanUtils.toThousands(t));
		        });
		        return returnArray;
		    } else if (array) {
		        return $.fanUtils.toThousands(array);
		    } else {
		        console.log('oThousandsArray 报错');
		        return false;
		    }
		},
		toDecimal:function(x){
			var f = parseFloat(x);  
	        if (isNaN(f)) {  
	            return;  
	        }  
	        f = (Math.round(x*100)/100).toFixed(2);  
	        return f;  
		},
		formatDate:function(time, isTime) {//时间格式化
	        var date = new Date(time);
	        var year = date.getFullYear() + '-';
	        var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	        var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	        if (isTime) {
	            var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	            var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	            var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	            return year + month + day + hour + minute + second;
	        } else {
	            return year + month + day;
	        }
	    },
	    getTime:function(str){
	    	return new Date(str).getTime();
	    },
	    /**
		 * 对象非空校验
		 * 
		 * @param obj
		 * @returns {Boolean}
		 */
		isNotEmpty : function(obj) {
			if (obj == 'undefined' || obj == null || obj.length == 0) {
				return false;
			}
			return true;
		},
		/**
		 * 判断数组集合中是否含有指定对象
		 * 
		 * @param arr  数组
		 ,o            要进行判断的对象
		 * @returns {Boolean}
		 */
		arrayContains : function(arr,o) {
			var flag = false;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == o) {
					flag = true;
					break;
				}
			}
			return flag;
		},
		resetForm: function() {//表单重置
			var inputs = document.getElementsByTagName("INPUT");
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].type == "password") {
					inputs[i].value = "";
				}
				if (inputs[i].type == "text") {
					inputs[i].value = "";
				}
				if (inputs[i].type == "hidden") {
					inputs[i].value = "";
				}
				if (inputs[i].type == "radio") {
					$("input[name='"+inputs[i].name+"']").removeAttr("checked").eq(0).prop("checked",true);
				}
			}
		},
		gps : function(callback){	
			var timestamp = Date.parse(new Date());
			window.location.href = "http://cmbls/gps?id=" + timestamp;		
		    CMBLS = {};
			CMBLS.gps = {}
			CMBLS.gps.successCallback = function(id, message) {
				//var xmlStrDoc = $.parseXML(message);
				//setCookie('gps', JSON.stringify({longitude:$(xmlDoc).find('longitude').html(), latitude:$(xmlDoc).find('latitude').html()}));	
				var latitude=(message+"").split(">")[2].split("<")[0];
				var longitude=(message+"").split(">")[4].split("<")[0];
				localStorage.setItem('longitude', longitude);
				localStorage.setItem('latitude', latitude);
				callback();
			}
			CMBLS.gps.failCallback = function(id, message) {
				localStorage.setItem('longitude', '121.472644');
				localStorage.setItem('latitude', '31.231706');
				callback();
			}
		},
		ticketCode : function(code){
			var code_copy = code;
			var len = parseInt(code_copy.length / 4);
			var code_new = '';
	        for(var i=0; i< len; i++){
	        	code_new += code_copy.substring(i*4, (i+1)*4) + '&nbsp';
	        }       
	        return code_new;
		},
		initUser : function(p_user_id){
			user_id = getCookie('userid');
	    	if(!user_id || user_id == "" || user_id == undefined || user_id != p_user_id){
	    		setCookie('userid', p_user_id);       	
	    	} 
		},
		setGps : function(longitude, latitude){
			setCookie('gps', JSON.stringify({'longitude': longitude, 'latitude':latitude}));	
		},
		checkMobile : function(num){
			var re = /^1\d{10}$/;
			if(re.test(num)){
				return true;
			}else{
				return false;
			}
		},
		initphone : function(phone){
			var copy_phone = phone;
			if(copy_phone){
	            copy_phone = phone.substring(0,3) +  '****' + phone.substring(7,11);
			}
			return copy_phone;
		},
		get:function(msg){
            $.ajax({
                type: 'get',
                url: msg.url,
                data: msg.data,
                success: function(response){
                    msg.callback(response);
                }
            })
        },
        post:function(msg){
            $.ajax({
                type: 'post',
                url: msg.url,
                data: msg.data,
                success: function(response){
                    msg.callback(response);
                }
            })
        },
        baidutongji: function(){
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?b0c3ed110c338d3db3f39444c6e35783";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        },
	}
}(jQuery || Zepto || Window));

    
