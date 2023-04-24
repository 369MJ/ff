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

