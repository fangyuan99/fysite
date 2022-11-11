// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://ehall.scnu.edu.cn/infoplus/form/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scnu.edu.cn
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
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
  const change = () => {
    var form_remark_holder = document.getElementById("form_remark_holder");
    if (form_remark_holder == undefined || form_remark_holder.innerHTML == "") {
      console.log("change加载中...");
      return;
    }
    console.log("change start");
    var title_holder = document.getElementById("title_holder");
    //类名改成doing
    title_holder.className = "doing";
    var idx = -1;

    if (idx == -1) {
      var li_list = document.getElementsByClassName("form_milestone_view")[0]
        .childNodes;
      for (let i = 0; i < li_list.length; i += 2) {
        var li = li_list[i];
        var content_name =
          li.getElementsByClassName("content_name")[0].innerHTML;
        if (content_name == "办结") {
          if (i - 2 >= 0) {
            idx = i - 2;
          } else {
            idx = i - 1;
          }
        }
      }
    }
    if (idx != -1) {
      li_list[idx - 1].className = "form_milestone_step_arrow_li blue";
      li_list[idx].className = "form_milestone_step blue";
      li_list[idx].childNodes[0].className = "floater blue singleLine";
      if (idx + 1 < li_list.length) {
        li_list[idx + 1].className = "form_milestone_step_arrow_li gray";
        li_list[idx + 1].childNodes[0].childNodes[0].className =
          "form_milestone_step_arrow blue";
      }
      for (let i = idx + 2; i < li_list.length - 1; i += 2) {
        li_list[i - 1].className = "form_milestone_step_arrow_li gray";
        li_list[i].className = "form_milestone_step gray";
        li_list[i].childNodes[0].className = "floater gray singleLine";
        if (i + 1 < li_list.length) {
          li_list[i + 1].className = "form_milestone_step_arrow_li gray";
          li_list[i + 1].childNodes[0].childNodes[0].className =
            "form_milestone_step_arrow gray";
        }
      }
      li_list[li_list.length - 1].className = "form_milestone_step gray last";
      li_list[li_list.length - 1].childNodes[0].className =
        "floater gray singleLine";
    }
    var lastT = new Date();
    lastT.setTime(lastT.getTime() - 24 * 60 * 60 * 1000);
    lastT = lastT.Format("yyyy-MM-dd");
    form_remark_holder.innerHTML = `<ul><li class="remark_item"><div class="form_remark_title"><span class="color_b2" style=""><span class=""><b>王心旭</b></span>   填写/办理了<b><a target="_blank" title="查看该环节表单的快照" href="/infoplus/form/2007513/render?snapshot=true">二级学院审核意见</a></b>(<span class="color_b3"><b>通过</b></span>)</span><span class="form_remark_time" title="指派时间:${lastT} 17:37  办理时间:${lastT} 20:48">${lastT} 20:48</span></div></li></ul>`;
    clearInterval(changeId);
    changeId = null;
    console.log("change end");
  };
  const qj = () => {
    var tr_list = document.querySelector(".xdLayout");
    if (tr_list == undefined || tr_list.length == 0) {
      console.log("qj加载中...");
      return;
    }
    tr_list = tr_list.querySelector("tbody").querySelectorAll("tr");
    console.log("start");

    //修改数据获取
    var t = new Date().Format("yyyy-MM-dd");
    var tmp_data;
    var qj_data;
    tmp_data = localStorage.getItem("qj_data");
    if (tmp_data == null) {
      qj_data = {
        申请时间: t,
        外出时间: [t, t],
        外出天数: 1,
        外出地点类别: "市内",
        交通工具: "室内交通",
        具体地址: ["广东省", "佛山市", "南海区", "阳光广场"],
        事由: "事由",
        审核日期: t,
        确认日期: t,
      };
    } else {
      qj_data = {
        ...JSON.parse(tmp_data),
      };
    }

    //修改数据
    var diff = qj_data["外出天数"] * 1;
    const find_idx = () => {
      var idx_list = {};
      for (let i = 0; i < tr_list.length; i++) {
        var tmp = tr_list[i].querySelector("span")?.innerHTML;
        if (tmp == "事由" || tmp == "外出时间" || tmp == "具体地址") {
          idx_list = {
            ...idx_list,
            [tmp]: i + 1,
          };
        } else {
          if (qj_data[tmp] != undefined && tr_list[i].style.display != "none") {
            if (idx_list[tmp] != undefined) {
              idx_list[tmp] = [idx_list[tmp], i];
              continue;
            }
            idx_list = {
              ...idx_list,
              [tr_list[i].querySelector("span")?.innerText]: i,
            };
          }
        }
      }
      return idx_list;
    };
    var idx_list = find_idx();
    const set_data = () => {
      if (diff == 1) {
        qj_data["申请时间"] = t;
        qj_data["外出时间"] = [t, t];
        qj_data["外出天数"] = 1;
      }
      for (let i in idx_list) {
        let idx = idx_list[i];
        if (typeof idx == "number") {
          if (typeof qj_data[i] == "object") {
            for (let j = 0; j < qj_data[i].length; j++) {
              tr_list[idx].getElementsByClassName(
                "infoplus_control infoplus_labelControl inline"
              )[j].innerText = qj_data[i][j];
            }
          } else {
            let els = tr_list[idx].querySelectorAll("div");
            els[els.length - 1].innerHTML = qj_data[i];
          }
        } else {
          for (let j = 0; j < idx.length; j++) {
            if (typeof qj_data[i] == "object") {
              for (let k = 0; k < qj_data[i].length; k++) {
                tr_list[idx[j]].getElementsByClassName(
                  "infoplus_control infoplus_labelControl inline"
                )[k].innerText = qj_data[i][k];
              }
            } else {
              let els = tr_list[idx[j]].querySelectorAll("div");
              els[els.length - 1].innerHTML = qj_data[i];
            }
          }
        }
      }
    };
    set_data();
    var save = 1;
    const click_save = () => {
      console.log("click");
      save++;
      if (save % 2) {
        document.designMode = "off";
        if (diff != 1) qj_data["外出天数"] = diff;
        let i = "具体地址";
        let idx = idx_list[i];
        for (let j = 0; j < qj_data[i].length; j++) {
          qj_data[i][j] = tr_list[idx].getElementsByClassName(
            "infoplus_control infoplus_labelControl inline"
          )[j].innerText;
        }
        i = "事由";
        idx = idx_list[i];
        var els = tr_list[idx].querySelectorAll("div");
        qj_data[i] = els[els.length - 1].innerHTML;
        localStorage.setItem("qj_data", JSON.stringify(qj_data));
        alert("已保存");
        return;
      }
      document.designMode = "on";
      diff = prompt("请输入请假（jiǎ）天数：", diff);
      if (diff == null) {
        diff = 1;
      }
      diff *= 1;
      qj_data["外出天数"] = diff;
      var t2 = new Date();
      t2.setTime(t2.getTime() + 24 * 60 * 60 * 1000 * (diff - 1));
      t2 = t2.Format("yyyy-MM-dd");
      qj_data["外出时间"][1] = t2;
    };

    //添加点击事件
    tr_list[idx_list["外出天数"]].getElementsByClassName(
      "infoplus_labelControlContainer inline"
    )[0].onclick = click_save;

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
    clearInterval(qjId);
    qjId = null;
    console.log("end");
  };
  let qjId;
  let changeId;
  if (!qjId) {
    qjId = setInterval(qj, 1000);
  }
  if (!changeId) {
    changeId = setInterval(change, 1000);
  }
})();
