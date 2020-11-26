// client-side js, loaded by index.html
// run by the browser each time the page is loaded

require("intersection-observer");
const scrollama = require("scrollama");

let pIndex = 0;
function loopParas(p) {
  let retval = "";
  let sents = p.split(/((?:\w+ ){5})/g).filter(Boolean);
  for (let s of sents) {
    if (pIndex % 3 == 0) {
      retval += `<span class="jumbler">${s}</span>`;
    } else {
      retval += `<span>${s}</span>`;
    }
    pIndex++;
  }
  return retval;
}

let main = document.querySelector("main");
main.querySelectorAll("p").forEach((p) => {
  p.innerHTML = loopParas(p.innerText);
})

// --------------------------------
// IntersectionObservers
// --------------------------------

// instantiate the scrollama
const scroller1 = scrollama();
const scroller1Range = scrollama();
const scroller1Range2 = scrollama();
const scroller2 = scrollama();

// setup the instance, pass callback functions
scroller1
  .setup({
    step: ".jumbler",
    offset: 0.2
  })
  .onStepEnter((r) => {
    console.log(r);
    if (r.direction == "down" && Math.random() >= 0.5) {
      // startJumbleLetters(r.element);
    } else if (r.direction == "up") {
      // stopJumbleLetters(r.element);
    }
  });

scroller1Range
  .setup({
    step: ".jumbler",
    offset: 0
  })
  .onStepEnter((r) => {
    if (r.direction == "down") {
      // stopJumbleLetters(r.element);
    } else if (r.direction == "up") {
      // startJumbleLetters(r.element);
    }
  });

scroller1Range2
  .setup({
    step: ".jumbler",
    offset: 0.1
  })
  .onStepEnter((r) => {
    // if (r.direction == "down") {
      // stopJumbleLetters(r.element);
    // } else if (r.direction == "up") {
    if (Math.random() >= 0.3) {
      // startJumbleLetters(r.element);
    }
  });

scroller2
  .setup({
    step: ".jumbler",
    offset: 0.95
  })
  .onStepEnter((r) => {
    // startJumbleWords(r.element);
  })
  .onStepExit((r) => {
    // stopJumbleWords(r.element);
  });

// --------------------------------
// Letter jumblers
// --------------------------------

// let saveStateTop = "";
let saveStateBottom = "";

function startJumbleLetters(e) {
  if (!e.hasAttribute("data-originaltext")) {
    e.setAttribute("data-originaltext", e.innerText);
  }
  
  // saveStateTop = e.innerText;
  let words = e.innerText.split(" ");
  for (let i = 0; i < words.length; i++) {
    let lt = words[i].split("");
    words[i] = shuffle(lt).join("");
  }
  
  e.innerText = words.join(" ");
}

function stopJumbleLetters(e) {
  if (e.hasAttribute("data-originaltext")) {
    e.innerText = e.getAttribute("data-originaltext");
  }
}

function startJumbleWords(e) {
  saveStateBottom = e.innerText;
  let text = e.innerText.split(" ");
  text = shuffle(text);
  e.innerText = text.join(" ") + " ";
}

function stopJumbleWords(e) {
  e.innerText = saveStateBottom;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// --------------------------------
// Advertisements
// --------------------------------

// setup resize event
window.addEventListener("resize", scroller1.resize);
window.addEventListener("resize", scroller2.resize);

const adscroller = scrollama();

// setup the instance, pass callback functions
adscroller
  .setup({
    step: ".bad",
    offset: 0.5
  })
  .onStepEnter((r) => {
    r.element.classList.add("visible");
    if (r.index > 0) {
      document.querySelector(".subscribe").classList.add('visible');
    }
    // startJumbleLetters(r.element);
  })
  .onStepExit((r) => {
    
    // if (r.index > 0) {
    //   document.querySelector(".ad.size1").classList.add("visible");
    // }
    // if (r.index > 1) {
    //   document.querySelector(".ad.size2").classList.add("visible");
    // }
    // stopJumbleLetters(r.element);
  });

// --------------------------------
// Connecting words
// --------------------------------

// function connectWords() {
//   var paras = 
// }