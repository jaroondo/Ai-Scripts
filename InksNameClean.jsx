// vyhodi PANTONE a C z nazvu farby

var sps = app.activeDocument.swatches;

// apply REGULAR EXPRESSIONs on page item
function clearPantone(item) {
  item.name = item.name.replace(/PANTONE/, ""); // <- nahradi "PANTONE" prazdnym znakom
  item.name = item.name.replace(/C$/, ""); // $ = na konci textu <- nahradi "C" prazdnym znakom na konci textu
  item.name = item.name.replace(/\sC_/, "_"); // \s = space, medzera <- nahradi "C_" znakom "_"
  item.name = item.name.replace(/\sC\s/, ""); //<- nahradi " C " prazdnym znakom
}

forAll(sps, clearPantone);

app.activeDocument.save();
