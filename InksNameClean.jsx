// vyhodi PANTONE a C z nazvu farby

inksArr = getEgInks();

// apply REGULAR EXPRESSIONs on page item
function clearPantone(item) {
  item.swatch.name = item.swatch.name.replace(/PANTONE\s/, ""); // <- nahradi "PANTONE" prazdnym znakom
  item.swatch.name = item.swatch.name.replace(/\sC$/, ""); // $ = na konci textu <- nahradi "C" prazdnym znakom na konci textu
  item.swatch.name = item.swatch.name.replace(/\sC_/, "_"); // \s = space, medzera <- nahradi "C_" znakom "_"
  item.swatch.name = item.swatch.name.replace(/\sC\s/, ""); //<- nahradi " C " prazdnym znakom
}

forAll(inksArr, clearPantone);

app.activeDocument.save();
