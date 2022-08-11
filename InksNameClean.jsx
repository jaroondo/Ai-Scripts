// vyhodi PANTONE a C z nazvu farby

(function(){
  var doc = app.activeDocument;
  //var sws = getDocumentElements("swatches");
  var sps = getDocumentElements("spots");

  function getDocumentElements(setName) { // return array of document items
    var result = [];
    
    for (var i = 0; i < doc[setName].length; i++) {
      result.push(doc[setName][i]);
    }
    
    return result;
  }

  function clearPantone(item) {
    item.name = item.name.replace(/PANTONE/, "");
    item.name = item.name.replace(/C$/, ""); // $ na konci textu
    item.name = item.name.replace(/\sC_/, "_"); // \s space - medzera
    item.name = item.name.replace(/\sC\s/, "");
  }

  //sps.forEach(clearPantone); // funguje iba v plugine, v AI hlasi "sps.forEach is not function"
  
  function forAll(array, callBack) {
    for (var i = 0; i < array.length; i++) {
      callBack(array[i]);
    }
  }
  
  forAll(sps, clearPantone);
  
})();