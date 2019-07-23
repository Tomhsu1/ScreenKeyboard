var text;
var oldText = "";
var newText = "";
var totalText = "";
var insertedText = "";
var movedText = "";
var caps;
var numOfCapsClicks = 1;
var upperKeys;
var lowerKeys;
var key;
var capsActivated = false;
var blinkingCursor = "|";
var coloredCursor;
var time = 0;
var shiftActivated = false;
var numOfShiftClicks = 1;
var shifts;
var spShiftCharacters = false;
var doubQuo = "\"";
var cursorClicks = 1;
var firstHalf;
var secondHalf;
var atEnd = true;

function typing(key, secondKey) {
  text = document.getElementById("textbox");
  document.getElementById("textbox").scrollTop = document.getElementById("textbox").scrollHeight;
  if (key === "BKSP") {
    oldText = oldText.substring(0, oldText.length - 1);
  } else if (key === "SPBR") {
    oldText = oldText + " ";
  } else if (key === "ENTR") {
    oldText = oldText + "\n";
  } else {
    if (capsActivated === true && shiftActivated === false) {
        upperKeys = key.toUpperCase();
        oldText = oldText + upperKeys;
    } else if (shiftActivated === true && capsActivated === false && secondKey == "") {
        upperKeys = key.toUpperCase();
        oldText = oldText + upperKeys;
        shifts = document.getElementsByClassName("shift");
        for (var i = 0; i < shifts.length; i++) {
          shifts[i].style.backgroundColor="black";
        }
        shiftActivated = false;
    } else if (shiftActivated === true && capsActivated === false && secondKey !== "") {
        oldText = oldText + secondKey;
        shifts = document.getElementsByClassName("shift");
        for (var i = 0; i < shifts.length; i++) {
          shifts[i].style.backgroundColor="black";
        }
      shiftActivated = false;
    } else if (capsActivated === true && shiftActivated === true) {
        shiftActivated = false;
        capsActivated = true;
        lowerKeys = key.toLowerCase();
        oldText = oldText + lowerKeys;
        shifts = document.getElementsByClassName("shift");
        for (var i = 0; i < shifts.length; i++) {
          shifts[i].style.backgroundColor="black";
        }
    } else {
        lowerKeys = key.toLowerCase();
        oldText = oldText + lowerKeys;
    }
  }
  if (atEnd == true) {
    totalText = oldText;
  } else {
     if (key === "BKSP" && secondHalf === "") {
      firstHalf = firstHalf.substring(0, firstHalf.length - 1);
    } else if (key === "BKSP" && secondHalf !== "") {
      firstHalf = totalText.substring(0, firstHalf.length - 1);
    }
    totalText = firstHalf + oldText + secondHalf;
  }
  text.textContent = totalText;
}

function CAPSACTIVATION() {
  numOfCapsClicks++;
  if (numOfCapsClicks % 2 === 0) {
    capsActivated = true;
    caps = document.getElementsByClassName("cplk");
    for (var i = 0; i < caps.length; i++) {
      caps[i].style.backgroundColor="turquoise";
    }
  } else {
    capsActivated = false;
    caps = document.getElementsByClassName("cplk");
    for (var i = 0; i < caps.length; i++) {
      caps[i].style.backgroundColor="black";
    }
  }
}
function SHIFTACTIVATION() {
    shiftActivated = true;
    numOfShiftClicks++;
    if (shiftActivated === true && numOfShiftClicks % 2 == 0 || numOfShiftClicks % 2 == 1) {
      shifts = document.getElementsByClassName("shift");
      for (var i = 0; i < shifts.length; i++) {
        shifts[i].style.backgroundColor="turquoise";
      }
    } else {
      shifts = document.getElementsByClassName("shift");
      for (var i = 0; i < shifts.length; i++) {
        shifts[i].style.backgroundColor="black";
      }
    }
}

function moveCursor(direction) {
  if (direction === "left") {
    atEnd = false;
    oldText = "";
    cursorClicks = cursorClicks - 1;
    firstHalf = totalText.substring(0, totalText.length + cursorClicks);
    secondHalf = totalText.substring(totalText.length + cursorClicks, totalText.length);
    movedText = firstHalf + blinkingCursor + secondHalf;
    text.textContent = movedText;
  } else if (direction === "right") {
    atEnd = false;
    oldText = "";
    cursorClicks = cursorClicks + 1;
    firstHalf = totalText.substring(0, totalText.length + cursorClicks);
    secondHalf = totalText.substring(totalText.length + cursorClicks, totalText.length);
    movedText = firstHalf + blinkingCursor + secondHalf;
    text.textContent = movedText;
  }
}
