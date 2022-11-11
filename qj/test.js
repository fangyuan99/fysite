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
var save = -1;
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
idx_list = find_idx();
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
        var els = tr_list[idx].querySelectorAll("div");
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
          var els = tr_list[idx[j]].querySelectorAll("div");
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
