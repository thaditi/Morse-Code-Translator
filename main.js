updateMode();

function updateMode() {
  var str = isDecodeMode()
    ? "Type morse code here, for example: -... --- -..- . -. - --.- .. --.-"
    : "Type message text here";
  document.getElementById("srctext").placeholder = str;
  updateText();
}

function isDecodeMode() {
  return document.getElementById("morseToTextRbn").checked;
}

function getAlphabet() {
  var alphabet =
    "A.-|B-...|C-.-.|D-..|E.|F..-.|G--.|H....|I..|J.---|K-.-|L.-..|M--|N-.|O---|P.--.|Q--.-|R.-.|S...|T-|U..-|V...-|W.--|X-..-|Y-.--|Z--..|1.----|2..---|3...--|4....-|5.....|6-....|7--...|8---..|9----.|0-----|..-.-.-|,--..--|?..--..|!..--.|--....-|(-.--.|)-.--.-|/-..-.|_..--.-|:---...|;-.-.-.|" +
    "'" +
    '.----.|".-..-.|%.--..|=-...-|+.-.-.|@.--.-.';
  var dict = {};

  var arr = alphabet.split("|");
  for (var i = 0; i < arr.length; i++) {
    dict[arr[i][0]] = arr[i].slice(1);
  }

  return dict;
}

function clearText() {
  document.getElementById("srctext").value = "";
  document.getElementById("resulttext").value = "";
}

function updateText() {
  var src = document.getElementById("srctext").value.trim().toUpperCase();
  var dst = "";
  var alphabet = getAlphabet();

  if (isDecodeMode()) {
    src = src.replace("_", "-");
    src = src.replace("|", "/");
    src = src.replace("/", " / ");
    var inverseAlphabet = {};
    for (var key in alphabet) {
      inverseAlphabet[alphabet[key]] = key;
    }
    var srcsymbols = src.split(/\s+/g);
    for (var i = 0; i < srcsymbols.length; i++) {
      dst += translateMorseChar(srcsymbols[i], inverseAlphabet);
    }
  } else {
    var sep = "";
    for (var i = 0; i < src.length; i++) {
      dst += sep + translateTextChar(src[i], alphabet);
      sep = " ";
    }
  }

  document.getElementById("resulttext").value = dst;
}

function translateTextChar(ch, alphabet) {
  if (alphabet[ch] != null) return alphabet[ch];
  else if (ch == "") return "";
  else if (ch == " ") return "/";
  return "#";
}

function translateMorseChar(ch, alphabet) {
  if (alphabet[ch] != null) return alphabet[ch];
  else if (ch == "") return "";
  else if (ch == "/") return " ";
  return "#";
}
