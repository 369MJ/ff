// 从sessionStorage中获取数据
var data = sessionStorage.getItem('data');
// 检查数据是否存在并且是一个字符串
if (data && typeof data === 'string') {
  // 将数据分成100个小块
  var chunks = chunkString(data, 2000);
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

// 定义每页显示的数据量
var pageSize = 10;
// 定义当前页码
var currentPage = 1;

// 加载数据函数
function loadData() {
  // 发送Ajax请求获取数据
  $.ajax({
    url: 'http://sdagent.369pre.com/Client/',
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    success: function(data) {
      // 处理返回的数据
      processData(data);
      
      // 如果当前页码小于总页数，则继续加载下一页数据
      if (currentPage < getTotalPage(data.totalCount)) {
        currentPage++;
        loadData();
      }
    }
  });
}

// 处理每个小块的数据
function processData(data) {
  // 在这里添加您的数据处理代码
}

// 获取总页数
function getTotalPage(totalCount) {
  return Math.ceil(totalCount / pageSize);
}

// 启动加载数据
loadData();

// 启动文字滚动
autoScroll('#scrollDiv');

// 定义动画帧函数
function animate() {
  // 计算下一帧位置
  var marginTop = parseFloat($('#scrollDiv').css('margin-top'));
  marginTop -= 0.6;
  
  // 如果已经滚动到底部，则重置位置
  if (marginTop < -($('#scrollDiv li').height() * $('#scrollDiv li').length)) {
    marginTop = 0;
    
    // 加载下一页数据
    if (currentPage < getTotalPage(data.totalCount)) {
      currentPage++;
      loadData();
    }
  }
  
  // 设置新位置
  $('#scrollDiv').css('margin-top', marginTop + 'rem');
  
  // 请求下一帧动画
  requestAnimationFrame(animate);
}

// 启动动画
animate();

