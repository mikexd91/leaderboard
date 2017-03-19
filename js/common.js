$(document).ready(function() {
  insertFooterContent();
});

function insertFooterContent() {
  var footer = $(".footerContainer");
  var content = "<p align='center'>&copy; 2017 Mike Zhang Xunda</p>";
  footer.append(content);
}