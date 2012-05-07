describe("xKanvas Global Object", function() {
  var xkObject;
  var xkButton;
/*
  beforeEach(function() {
    xkObject = new xk.obj();
    xkButton = new xk.btn();
  });
*/
  it("should throw an error if you try to call onClick handler from xkObject", function() {
	xkObject = new xk.obj();
    expect(function() { xkObject.onClick() }).toThrow();
  });

});