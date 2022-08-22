// uncounting inks names

inksArr = getEgInks();

function inksNameUncount(item) {
  if (item.swatch.name.toString().charAt(2) == String.fromCharCode(94)) {
    item.swatch.name = item.swatch.name.toString().substr(3);
  }
}

forAll(inksArr, inksNameUncount);

app.activeDocument.save();
