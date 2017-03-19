$(document).ready(function() {
  processData();
  $('table.sortable').tablesorter({
    sortList: [[11,1]]
	});

  $('table.sortable').bind("sortEnd", function() {
    $(".dataRow").css("height", "20");
  })
});

function processData() {
  for (var i = 0; i < students.length; i++) {
    findSum(students[i]);
  }

  createRanklistTable(students);
  highlightRows();
}

function findSum(student) {
  student.score = student.ch1 + student.ch2 + student.ch3 + student.ch4 + student.ch5; 
  var studentName = student.name.toLowerCase();
}

function createRanklistTable(students) {
  students.sort(function(a, b) {
    return b.score - a.score;
  });

  updateStudentId();

  var table = $("#ranklistTable");

  const headers = ["Rank", "Name", "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Score"];
  var head = table.find("thead").find("tr");
  var body = table.find("tbody");

  for (i = 0; i < headers.length; i++) {
    if(i == 3 || i==4 || i==6 || i==7 || i==8 || i== 9){
      var header = "<th class = 'unused'>".concat(headers[i]).concat("</th>");
    }else if (i == 1){
       header = "<th class = 'unusedImage'>".concat(headers[i]).concat("</th>");
    }else{
       header = "<th>".concat(headers[i]).concat("</th>");
    }
    head.append(header);
  }

  for (i = 0; i < students.length; i++) {
    var R = students[i].r;
    var Name = students[i].name;
    var MC = students[i].ch1;
    var TC = students[i].ch2;
    var SPE = students[i].ch3;
    var HW = students[i].ch4;
    var Bs = students[i].ch5;
    var Sum = students[i].score;
    var nameTag;

    nameTag = "<td id ='test'>".concat(Name);
    

    var id = "row_".concat(R);
    var row = "<tr class='dataRow' id='".concat(id).concat("'><td>").concat(R).concat("</td>")
    .concat(nameTag).concat("</td><td class='unused'>").concat(MC).concat("</td><td class='unused'>")
    .concat(TC).concat("</td><td>").concat(SPE).concat("</td><td class='unused'>").concat(HW).concat("</td><td class='unused'>")
    .concat(Bs).concat("</td><td>").concat(Sum).concat("</td></tr>");
    body.append(row);

    if(i < students.length - 1) {
      var sumToCompare = students[i + 1].score;
      var diff = Sum - sumToCompare;
      var height = 20 + diff * 20;
      //console.log("diff: ", diff);
      //console.log("height: ", height);
      $("#".concat(id)).css('height', height.toString());
    }
  }
}

function updateStudentId() {
  for (var i = 0; i < students.length; i ++) {
    students[i].r = i + 1;
  }
}

function highlightRows() {
  var rows = $("#ranklistTable").find("tbody").find("tr");

  var goldVal = 0, silverVal = 0, bronzeVal = 0, pinkVal = 1000000000;
  var goldRow = 0, silverRow = 0, bronzeRow = 0, pinkRow = 0;

  for (i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    var cellLen = cells.length;
    var cellVal = parseFloat(cells.item(cellLen - 1).innerHTML, 10);
    
    if (cellVal > goldVal) {
          //if current gold is bigger than current silver, move silver to bronze
      if (goldVal > silverVal) {
        bronzeVal = silverVal;
        bronzeRow = silverRow;
      }
      silverVal = goldVal;
      silverRow = goldRow;
      goldVal = cellVal;
      goldRow = i;
    } else if (cellVal > silverVal) {
      bronzeVal = silverVal;
      bronzeRow = silverRow;
      silverVal = cellVal;
      silverRow = i;
    } else if (cellVal > bronzeVal) {
      bronzeVal = cellVal;
      bronzeRow = i;
    } 

    if (cellVal < pinkVal) {
      pinkVal = cellVal;
      pinkRow = i;
    }
  }

  // find equivalent rank
  for (i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    var cellLen = cells.length;
    var cellVal = parseFloat(cells.item(cellLen - 1).innerHTML, 10);
       
    if (cellVal == goldVal) {
      $(rows[i]).addClass("goldRow");
    } else if (cellVal == silverVal) {
      $(rows[i]).addClass("silverRow");
    } else if (cellVal == bronzeVal) {
      $(rows[i]).addClass("bronzeRow");
    } else if (cellVal == pinkVal) {
      $(rows[i]).addClass("pinkRow");
    }
  }
}


