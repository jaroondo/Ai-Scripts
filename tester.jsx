var inksArr = getEgInks();
// var swatches = app.activeDocument.swatches;
// var spots = app.activeDocument.spots;
// var inks = app.activeDocument.inkList;

function show(item) {
  $.writeln(getObjPropsValues(item));
  $.writeln(item.swatch + " -> " + getObjPropsValues(item.swatch));
}

$.writeln("*** ESKO INKS ***");
forAll(inksArr, show);

// $.writeln("*** SWATCHES ***");
// forAll(swatches, function (item) {
//   $.writeln(getObjPropsValues(item));
// });
// $.writeln("*** SPOTS ***");
// forAll(spots, function (item) {
//   $.writeln(getObjPropsValues(item));
// });
// $.writeln("*** INKS ***");
// forAll(inks, function (item) {
//   $.writeln(getObjPropsValues(item));
//   $.writeln("[InkInfo] -> " + getObjPropsValues(item.inkInfo));
// });
