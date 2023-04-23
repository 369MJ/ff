/**
 * Created by 369 on 2017/6/16.
 */
window.onload = function() {
    function GetRequest() {
		// 获取url中"?"符后的字串
        var url        = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs    = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
	
    var Request = new Object();
    Request     = GetRequest();

    //判断是否在为微信浏览器打开
    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    //如果是微信页面，打开遮罩页
    var isWeixin  = is_weixin();
    var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;

    function loadHtml() {
        var div       = document.createElement('div');
        div.id        = 'weixin-tip';
        div.innerHTML = '<p><img src="img/zhezhao.png" alt="微信打开" width="100%" /></p>';
        document.body.appendChild(div);
    }

    function load() {
        var div       = document.createElement('div');
        div.id        = 'weixin-tip';
        div.innerHTML = '<p><img src="img/zhezhao.png" alt="微信打开" width="100%" /></p>';
        document.body.appendChild(div);
    }

    function html(){
        var div       = document.createElement('div');
        div.id        = 'weixin-tip';
        div.innerHTML = '<p><img src="img/ipad_zhezhao.jpg" alt="微信打开" width="auto" max-width="100%" /></p>';
        document.body.appendChild(div);
    }

    function loadStyleText(cssText) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        try {
            style.appendChild(document.createTextNode(cssText));
        } catch (e) {
            style.styleSheet.cssText = cssText;
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
    }

    var cssText   = "#weixin-tip{position:fixed;left:0;top:0;background:rgba(0,0,0,0.8);width:100%;height:100%;} #weixin-tip p{text-align:center;}";
    var u         = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;// android终端
    var isiOS     = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);        // ios终端


    if (isWeixin) {
        var ua = navigator.userAgent.toLowerCase();
        if (/android/.test(ua)) {
            loadHtml();
            loadStyleText(cssText);
        } else if(isiOS){
            if((/iPhone/i).test(ua)){
                load();
                loadStyleText(cssText);
            }else if((/iPad/i).test(ua)){
                html();
                loadStyleText(cssText);
            }
        }
    }

}
