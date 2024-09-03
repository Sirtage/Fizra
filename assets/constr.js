const DEBUG = true;
var data = null;
var date = new Date();

var firstSel = document.getElementById("class-selector-element");
var secSel = document.getElementById("div-selector-element");

var class_list = null;

async function build() {
    document.getElementById("day-of-week").innerHTML += dateDict[date.getDay()+1];

    const res = await axios.get(DATA_LINK);
    data = res.data;

    if (DEBUG) console.log(data);

    class_list = data["class-reg"];
    
    class_list.forEach(element => {
        firstSel.innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`
    });

    fullChange();
}

function updateCurrentSchedule() {
    var nline = firstSel.value + "-" + secSel.value;
    
    let elem = document.getElementById("main-table");
    elem.innerHTML = "";

    let day = data["schedule"][nline]["0"][date.getDay()];

    if (day == 0) {
        
    } else {
        for (var i = 0; i < 9; i++) {
            let tmp = day["pos"][i];
            elem.innerHTML += `<div style="position: absolute; top: ${i == 0 ? "" : i}5%; width: 96%; height: 10%" class="sm-bordered">
                        <div style="position: absolute; width: 10%; height: 98%" class="sm-bordered">${i}</div>
                        <div style="position: absolute; left: 10%; width: 80%; height: 98%" class="sm-bordered">${tmp == undefined ? "" : tmp}</div>
                        <div style="position: absolute; left: 90%; width: 10%; height: 98%" class="sm-bordered"></div>
                    </div>
            `;
        }
    }
}