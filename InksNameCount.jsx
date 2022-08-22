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
