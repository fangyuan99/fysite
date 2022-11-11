$(function () {
  //do something
  console.log("start");
  document.getElementsByClassName("infoplus_radioLabel")[5].onclick =
    function () {
      location.href = "./holiday.html";
    };
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };
  var t = new Date().Format("yyyy-MM-dd");
  var labelContainer = document.getElementsByClassName(
    "infoplus_labelControlContainer inline"
  );
  var reason = localStorage.getItem("reason") || "购物";
  var infoplus_label = document.getElementsByClassName(
    "infoplus_labelControlContainer"
  );
  infoplus_label[21].childNodes[0].innerHTML = reason;
  var place = localStorage.getItem("place") || "阳光广场";
  infoplus_label[18].childNodes[0].innerHTML = place;

  labelContainer[0].childNodes[0].innerHTML = t;

  var diff = localStorage.getItem("diff") || 1;
  //若diff不为1，则用缓存读取
  if (diff != 1) {
    labelContainer[10].childNodes[0].innerHTML =
      localStorage.getItem("start") || t;
    labelContainer[11].childNodes[0].innerHTML =
      localStorage.getItem("end") || t;
  } else {
    labelContainer[10].childNodes[0].innerHTML = t;
    labelContainer[11].childNodes[0].innerHTML = t;
  }
  var diffe = labelContainer[12];
  diffe.innerHTML = diff;
  var day3 = new Date();
  day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000 * (diff - 1));
  day3 = day3.Format("yyyy-MM-dd");
  labelContainer[11].childNodes[0].innerHTML = day3;
  var save = 1;
  diffe.onclick = function () {
    console.log("click");
    save++;
    if (save % 2) {
      document.designMode = "off";
      //id为reason的innerHTML缓存到localStorage
      localStorage.setItem(
        "reason",
        infoplus_label[21].childNodes[0].innerHTML
      );
      //地点
      localStorage.setItem("place", infoplus_label[18].childNodes[0].innerHTML);
      if (diff != 1) {
        //开始时间
        localStorage.setItem(
          "start",
          labelContainer[10].childNodes[0].innerHTML
        );
        //结束时间
        localStorage.setItem("end", labelContainer[11].childNodes[0].innerHTML);
      }
      alert("已保存");
      return;
    }
    document.designMode = "on";
    diff = prompt("请输入请假（jiǎ）天数：", diff);
    if (diff == null) {
      diff = 1;
    }
    diff *= 1;
    localStorage.setItem("diff", diff);
    diffe.innerHTML = diff;
    var day3 = new Date();
    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000 * (diff - 1));
    day3 = day3.Format("yyyy-MM-dd");
    labelContainer[11].childNodes[0].innerHTML = day3;
  };
  var uploadFileList = document.getElementsByClassName("uploadFileName");

  //生成一个0-30的随机数和一个31-59的随机数
  var random1 = Math.floor(Math.random() * 30);
  var random2 = Math.floor(Math.random() * 29 + 31);
  uploadFileList[0].innerHTML = `Snipaste_15-35-${random1}.png`;
  uploadFileList[1].innerHTML = `Snipaste_15-35-${random2}.png`;

  labelContainer[22].childNodes[0].innerHTML = t;
  labelContainer[24].childNodes[0].innerHTML = t;
  document.querySelector("#title_description_short").onclick = () => {
    // 弹出框询问是否清理
    if (confirm("是否清理数据？")) {
      localStorage.clear();
      location.reload();
    }
  };
  document.querySelectorAll("a").forEach((item) => {
    item.removeAttribute("href");
  });
  console.log("end");
});
