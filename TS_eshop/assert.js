//assert [Modern JS]
function assert1(expression, message) {
  if (!expression)
    throw {
      name: "Assertion Exception",
      message: message
    };
}

//assert [JS Ninja]
function assert2(value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}
function report(text) {
    assert1(true, text);
}
window.onload = function() {
    this.assert2(true, "The test suite is running");
    this.assert2(false, "Fail");
};

//Assert [JS TDD]
function assert3(message, expr) {
  if (!expr) {
    throw new Error(message);
  }
  assert3.count++;
  return true;
}
assert3.count = 0;
