// 从sessionStorage中获取数据
var data = sessionStorage.getItem('data');
// 检查数据是否存在并且是一个字符串
if (data && typeof data === 'string') {
  // 将数据分成100个小块
  var chunks = chunkString(data, 200);
  // 循环读取每个小块
  for (var i = 0; i < chunks.length; i++) {
    // 处理每个小块的数据
    processData(chunks[i]);
  }
}

// 将字符串分成指定大小的小块
function chunkString(str, size) {
  var chunks = [];
  for (var i = 0; i < str.length; i += size) {
    chunks.push(str.substr(i, size));
  }
  return chunks;
}

// 处理每个小块的数据
function processData(data) {
  // 在这里添加您的数据处理代码
}

// 兼容原先的代码，如果原先的代码存在processData函数，则在新代码中调用它
if (typeof processData === 'function') {
  processData(data);
}

//本地存储
var localStorage = window.sessionStorage;
function get(name) {
  var value = localStorage.getItem(name);
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value);
  }
  return value;
}
function set(name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(name, value);
}
function remove(name) {
  return localStorage.removeItem(name);
}

//获取链接参数
function getparam(name, url) {
  var m, reg, tmp;
  url = (url || window.location.href).split('#');
  if (name.indexOf('#') != -1) {
    tmp = url.length < 2 ? '' : url[1];
  } else {
    tmp = url[0];
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
  if (m) {
    return decodeURIComponent(m[0].split('=')[1]);
  } else {
    return '';
  }
}


//自定义获取链接参数
function getSelfparam(name, url) {
  var m, reg, tmp;
  url = (url || window.location.href).split('#');
  if (name.indexOf('#') != -1) {
    tmp = url.length < 2 ? '' : url[1];
  } else {
    tmp = url[1];
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
  if (m) {
	var arr = m[0].split('=');
    return decodeURIComponent(arr[1]);
  } else {
    return '';
  }
}


// ajaxpost同步请求
function ajaxPost_syn(url, data, success, error) {
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    async: false,
    // contentType: 'application/json;charset=UTF-8',
    data: data ? data : {},
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    }
  });
}

// ajaxpost异步请求
function ajaxPost(url, data, success, error) {
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    // contentType: 'application/json;charset=UTF-8',
    data: data ? data : {},
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    }
  });
}

// ajaxget请求 无缓存
function ajaxGet(url, data, success, error) {
  $.ajax({
    url: url,
    data: data ? data : {},
    //cache: false,
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    }
  });
}

//历史回退
function goBack() {
  window.history.back();
}


//返回登录
function goLogin() {
  window.location.href = path + '/login.html';
}

//信息提示
function layerMsg(msg) {
  layer.open({
    content: msg,
    skin: 'msg',
    time: 2
  });
}

//判断微信浏览器
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}



//文字滚动方法
function autoScroll(obj) {
  $(obj).animate({
      marginTop: "-0.6rem"
  }, 600, "linear", function () {
      $(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
  })
}
