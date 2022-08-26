// #script "Startup"
// #includepath "./Startup Scripts"
// #include "scriptLibrary.jsx"
// #targetengine "session"

// ScriptUI Dialog Builder - START ============================================================================================================================================

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":7,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"menuPrepress","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Prepress","preferredSize":[0,0],"margins":8,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"TreeView","parentId":0,"style":{"enabled":true,"varName":"","preferredSize":[100,0],"alignment":null}},"item-2":{"id":2,"type":"TreeItem","parentId":1,"style":{"enabled":true,"varName":"","text":"Inks"},"expanded":true},"item-3":{"id":3,"type":"TreeItem","parentId":2,"style":{"enabled":true,"varName":"","text":"Name"},"expanded":true},"item-4":{"id":4,"type":"TreeItem","parentId":3,"style":{"enabled":true,"varName":"inksNameClear","text":"Clear"}},"item-5":{"id":5,"type":"TreeItem","parentId":3,"style":{"enabled":true,"varName":"inksNameCount","text":"Count"}},"item-6":{"id":6,"type":"TreeItem","parentId":3,"style":{"enabled":true,"varName":"inksNameUncount","text":"Uncount"}},"item-7":{"id":7,"type":"TreeItem","parentId":2,"style":{"enabled":true,"varName":"inksCoverage","text":"Coverage"}},"item-8":{"id":8,"type":"TreeItem","parentId":1,"style":{"enabled":false,"varName":"wbcImport","text":"WBC import"}},"item-9":{"id":9,"type":"TreeItem","parentId":1,"style":{"enabled":false,"varName":"pdfExport","text":"PDF export"},"collapsed":true},"item-10":{"id":10,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"btnGo","text":"GO","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}}},"order":[0,1,2,7,3,4,5,6,8,9,10],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/

// MENUPREPRESS
// ============
var menuPrepress = new Window("dialog");
menuPrepress.text = "Prepress";
menuPrepress.orientation = "column";
menuPrepress.alignChildren = ["center", "top"];
menuPrepress.spacing = 10;
menuPrepress.margins = 8;

// TREEVIEW1
// =========
var treeview1 = menuPrepress.add("treeview", [0, 0, 100, 184], undefined, {
  name: "treeview1",
});

var treeitem1 = treeview1.add("node", "Inks");
var inksCoverage = treeitem1.add("item", "Coverage");
var treeitem2 = treeitem1.add("node", "Name");
var inksNameClear = treeitem2.add("item", "Clear");
var inksNameCount = treeitem2.add("item", "Count");
var inksNameUncount = treeitem2.add("item", "Uncount");
var wbcImport = treeview1.add("item", "WBC import");
wbcImport.enabled = false;
var pdfExport = treeview1.add("item", "PDF export");
pdfExport.enabled = false;

treeitem1.expanded = true;
treeitem2.expanded = true;

// MENUPREPRESS
// ============
var btnGo = menuPrepress.add("button", undefined, undefined, { name: "btnGo" });
btnGo.text = "GO";
btnGo.preferredSize.width = 100;

// ScriptUI Dialog Builder - END ============================================================================================================================================

// Event handlers

btnGo.onClick = function () {
  var selected = treeview1.selection.toString();
  // $.writeln(selected);
  if (selected == "Clear") {
    // $.writeln(selected);
    goInksNameClear();
  } else if (selected == "Count") {
    // $.writeln(selected);
    goInksNameCount();
  } else if (selected == "Uncount") {
    // $.writeln(selected);
    goInksNameUncoat();
  } else if (selected == "Coverage") {
    // $.writeln(selected);
    setXMPPrepress();
  }
};

menuPrepress.show();

// Prepress functions

function goInksNameClear() {
  // vyhodi PANTONE a C z nazvu farby
  inksArr = getEgInks();

  function clearPantone(item) {
    // apply REGULAR EXPRESSIONs on page item
    item.swatch.name = item.swatch.name.replace(/PANTONE\s/, ""); // <- nahradi "PANTONE" prazdnym znakom
    item.swatch.name = item.swatch.name.replace(/\sC$/, ""); // $ = na konci textu <- nahradi "C" prazdnym znakom na konci textu
    item.swatch.name = item.swatch.name.replace(/\sC_/, "_"); // \s = space, medzera <- nahradi "C_" znakom "_"
    item.swatch.name = item.swatch.name.replace(/\sC\s/, ""); //<- nahradi " C " prazdnym znakom
  }

  forAll(inksArr, clearPantone);
  app.activeDocument.save();
}

function goInksNameCount() {
  // counting in inks names
  inksArr = getEgInks();

  function inksNameCount(item) {
    if (item.swatch.name.toString().charAt(2) !== String.fromCharCode(94)) {
      item.swatch.name =
        "0" + (item.id + 1) + String.fromCharCode(94) + item.swatch.name;
    }
  }

  forAll(inksArr, inksNameCount);
  app.activeDocument.save();
}

function goInksNameUncoat() {
  // uncounting inks names
  inksArr = getEgInks();

  function inksNameUncount(item) {
    if (item.swatch.name.toString().charAt(2) == String.fromCharCode(94)) {
      item.swatch.name = item.swatch.name.toString().substr(3);
    }
  }

  forAll(inksArr, inksNameUncount);
  app.activeDocument.save();
}

function setXMPPrepress() {
  // zapise Prepress data do Xmp
  var nameSpace = "http://my.prepressSchema.namespace/";
  var myAiFile = new File(app.activeDocument.fullName);
  inksArr = getEgInks();

  function setProperties(item) {
    myXmp.setStructField(
      nameSpace,
      "smartInks[" + (item.id + 1) + "]",
      "http://my.prepressSchema.namespace/smartink#",
      "name",
      item.swatch.name
    ); // name zo swatch
    // myXmp.setStructField(nameSpace, "smartInks[" + (item.id + 1) + "]", "http://my.prepressSchema.namespace/smartink#", "coverage", "0"); // coverage default setting
    // myXmp.setStructField(nameSpace, "smartInks[" + (item.id + 1) + "]", "http://my.prepressSchema.namespace/smartink#", "overprint", "unknown"); // overprint default setting
  }

  if (loadXMPLibrary()) {
    // read xml packet
    xmpFile = new XMPFile(
      myAiFile.fsName,
      XMPConst.UNKNOWN,
      XMPConst.OPEN_FOR_UPDATE
    );
    var myXmp = xmpFile.getXMP();
    if (myXmp) {
      // var xmpInksCount = myXmp.countArrayItems("http://ns.esko-graphics.com/grinfo/1.0/", "inks");
      //$.writeln("Inks Count: " + xmpInksCount);
      if (!myXmp.doesPropertyExist(nameSpace, "artworkAngle")) {
        // set default artworkAngle
        myXmp.setProperty(nameSpace, "artworkAngle", 0);
      }
      if (!myXmp.doesPropertyExist(nameSpace, "punchNumAngle")) {
        // set default punchNumAngle
        myXmp.setProperty(nameSpace, "punchNumAngle", 0);
      }
      if (!myXmp.doesPropertyExist(nameSpace, "punchNumPrint")) {
        // set default punchNumPrint
        myXmp.setProperty(nameSpace, "punchNumPrint", true);
      }
      if (!myXmp.doesPropertyExist(nameSpace, "smartInks")) {
        // set smartInks
        myXmp.setProperty(nameSpace, "smartInks", null, XMPConst.PROP_IS_ARRAY);
        XMPMeta.registerNamespace(
          "http://my.prepressSchema.namespace/smartink#",
          "smartInk"
        );
      }
      forAll(inksArr, setProperties);
    }
    // put XMP into file
    app.activeDocument.close();
    if (xmpFile.canPutXMP(myXmp)) {
      xmpFile.putXMP(myXmp);
    } else {
      alert("Error storing XMP");
    }
    // close file
    xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
    unloadXMPLibrary();
    app.open(myAiFile);
  }
}
