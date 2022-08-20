//VARIABLE INITIALIZATION

let uncoveredCards = 0;
let timers = false;
let movements = 0;
let hits = 0;
let peers = 0;
let timer = 40;
let timersInitial = 45;
let showMoves = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("t-remaining");
let winAudio = new Audio("./sounds/EnglishSounds1.wav");
let loserAudio = new Audio("./sounds/EnglishSounds2.wav");
let clickAudio = new Audio("./sounds/EnglishSounds4.wav");
//RANDOM

let words = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
words = words.sort(() => {
  return Math.random() - 0.5;
});

//FUNCIONES

function countTime() {
  countdown = setInterval(
    () => {
      showTime.innerHTML = `time: ${timer} seconds`;
      timer--;
      if (timer < 0) {
        clearInterval(countdown);
        blockCards(words);
        loserAudio.play();
        gameOver();
      }
    },
    1500,
    timer
  );
}

function blockCards(words) {
  for (let i = 0; i <= 15; i++) {
    let lockedCard = document.getElementById(i);
    lockedCard.innerHTML = `<img src="./assets/${words[i]}.jpg" alt=${words[i]} />`;
    lockedCard.disabled = true;
  }
}

//PRINCIPAL FUNCTION

function uncover(id) {
  if (timers == false) {
    countTime();
    timers = true;
  }

  if (uncoveredCards == 0) {
    let card1 = document.getElementById(id);
    firstResult = words[id];
    card1.innerHTML = `<img src="./assets/${firstResult}.jpg" alt=${firstResult} />`;
    clickAudio.play();
    card1.disabled = true;
    uncoveredCards++;
    zoom(card1);
    firstId = id;
  } else if (uncoveredCards == 1) {
    let card2 = document.getElementById(id);
    secondResult = words[id];
    card2.innerHTML = `<img src="./assets/${secondResult}.jpg" alt=${secondResult} />`;
    zoom(card2);
    card2.disabled = true;
    uncoveredCards++;

    secondId = id;

    //MOVEMENT COUNTER
    movements++;
    showMoves.innerHTML = `Movements: ${movements}`;

    if (firstResult == secondResult) {
      uncoveredCards = 0;
      peers++;
      hits++;
      showHits.innerHTML = `Hits: ${hits}`;
      winAudio.play();
    } else {
      loserAudio.play();
      setTimeout(() => {
        card1 = document.getElementById(firstId);
        card2 = document.getElementById(secondId);
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
      }, 1500);
    }
  }

  if (hits == 8) {
    winAudio.play();
    clearInterval(countdownId);
    showTime.innerHTML = `greats! 💖 You have been late ${
      timerInitial - timer - 1
    } seconds`;
    showHits.innerHTML = `Hits: ${hits} 🤯`;
    showMoves.innerHTML = `Movements: ${movements} 🤩😎`;
  }
}
function gameOver() {
  showTime.innerHTML = `OMG! 🤯 time out!!`;
  showHits.innerHTML = `Hits: ${hits} 😵`;
  showMoves.innerHTML = `Movements: ${movements} 😒`;
}
function zoom(element) {
  element.childNodes[0].classList.add("zoom");
  setTimeout(() => {
    element.childNodes[0].classList.remove("zoom");
  }, 2000);
}
