(function (win) {
        var security = {};      // 初始事件正则
        var objOnEvents = {};
        var reAllEvents;      // init all events
        var doc = document;
        var arrDoms = [window, doc.createElement("form")];
        try {
            arrDoms.push(doc.createElement("img"));
            arrDoms.push(doc.createElement("iframe"));
            arrDoms.push(doc.createElement("object"));
            arrDoms.push(doc.createElement("embed"));
            arrDoms.push(doc.createElement("audio"));
        } catch (e) {
        }
        var dom;
        var key;
        for (var i = 0, c = arrDoms.length; i < c; i++) {
            dom = arrDoms[i];
            for (key in dom) {
                if (/^on/.test(key)) {
                    objOnEvents[key.substring(2)] = 1;
                }
            }
        }
        var arrAllEvents = [];
        for (key in objOnEvents) {
            arrAllEvents.push(key);
        }
        if (arrAllEvents.length > 0) {
            reAllEvents = new RegExp('([\'"`\\s\\/]on(?:' + arrAllEvents.join('|') + '))\\s*=', 'ig');
        } else {
            reAllEvents = /(['"`\s\/]on(\w+))\s*=/ig;
        }      // HTML转义
        security.encodeHTML = function (str) {
            return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };      // 过滤html中可能引发XSS的代码
        security.htmlFilter = function (str, args) {
            var reBadTags = /<(script|link|frame)([^\w])/ig;
            var reBadAttrs = /[\'"`\s\/](srcdoc)\s*=/ig;
            var reBadSrc = /[\'"`\s\/]src\s*=\s*['"]?\s*(javascript:|data\s*:\s*text\/html)/ig;
            str = String(str);          // 过滤script & link...
            str = str.replace(reBadTags, '<$10$2');         // 过滤on事件
            str = str.replace(reAllEvents, '$10=');         // 过滤srcdoc属性
            str = str.replace(reBadAttrs, ' $10=');         // 过滤危险src: javascript: data:
            str = str.replace(reBadSrc, ' src0="');
            return str;
        };      // hack jQuery
        security.hookJquery = function ($) {
            if ($ && !$.fn.rawHtml) {             // 1. html->rawHtml
                $.fn.rawHtml = $.fn.html;
                $.fn.html = function (value) {
                    var args = Array.prototype.slice.call(arguments);
                    if (typeof value === 'string' && $.htmlFilter) {
                        args[0] = security.htmlFilter(value, arguments);
                    }
                    return $.fn.rawHtml.apply(this, args);
                };
            }
        };
        win.security = security;
    })(window);