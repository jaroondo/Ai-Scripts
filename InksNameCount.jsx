// counting in inks names

var myAiFile = new File(app.activeDocument.fullName);
var inkName,
  oldName = "";
var mySwatch = {};

if (loadXMPLibrary()) {
  // read xml packet
  xmpFile = new XMPFile(
    myAiFile.fsName,
    XMPConst.UNKNOWN,
    XMPConst.OPEN_FOR_UPDATE
  );
  var myXmp = xmpFile.getXMP();
  if (myXmp) {
    var xmpInksCount = myXmp.countArrayItems(
      "http://ns.esko-graphics.com/grinfo/1.0/",
      "inks"
    );
    //$.writeln("Inks Count: " + xmpInksCount);
    for (var i = 1; i <= xmpInksCount; i++) {
      //  fill in smartInks from XML
      inkName = myXmp.getProperty(
        "http://ns.esko-graphics.com/grinfo/1.0/",
        "inks[" + i + "]/egInk:" + "name"
      );
      mySwatch = getSwatch(inkName);
      oldName = mySwatch.name;
      mySwatch.name = "0" + i + String.fromCharCode(94) + oldName;
      $.writeln(inkName + " -> " + mySwatch.name);
    }
  }
  xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
  unloadXMPLibrary();
}

app.activeDocument.save();
