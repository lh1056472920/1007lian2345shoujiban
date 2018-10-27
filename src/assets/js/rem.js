objBlurFun("input");

//如果不是当前触摸点不在input上,那么都失去焦点
function objBlurFun(sDom, time) {
  var time = time || 300;
  var browser = {
    versions: function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  if (browser.versions.ios) {
    var obj = document.querySelectorAll(sDom);
    for (var i = 0; i < obj.length; i++) {
      objBlur(obj[i], time);
    }
  }
}
// 元素失去焦点隐藏键盘
function objBlur(sdom, time) {
  var time = time || 300;
  if (sdom) {
    sdom.addEventListener("focus", function () {
      document.addEventListener("touchend", docTouchend, false);
    }, false);

  } else {
    throw new Error("objBlur()没有找到元素");
  }
  var docTouchend = function (event) {
    if (event.target != sdom) {
      setTimeout(function () {
        sdom.blur();
        document.removeEventListener('touchend', docTouchend, false);
      }, time);
    }
  };

}
