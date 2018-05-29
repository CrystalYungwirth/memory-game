/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const DEALT_CARDS = document.getElementById('dealtCards');

/**
 * @description Randomizes card layout
 * @param {array}
 * @returns shuffled cards
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * @description Starts new game
 */
function startGame() {
    cards = shuffle(cards);
    resetMoves();
    resetTimer();
    resetStars();
    matchedCards = [];
    
    for (let i = 0; i < cards.length; i++) {
        dealCards();
        cards[i].classList.remove('face-up', 'match', 'disabled');
    }
}
/**
 * @description Deals cards to unique location for each game.
 */
const dealCards = () => {
    [].forEach.call(cards, deal => {
      DEALT_CARDS.appendChild(deal);
    });
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'face-up' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/**
 *@description count player's moves
 *@param {number} moves
 *@returns {number} running tally of moves taken
 */

let moves = 0;
let moveTally = document.querySelector('.moves');

const moveCounter = () => {
  moves++;
  moveTally.innerHTML = `Moves: ${moves}`;
  
  currentStars();
  
  if (moves === 1) {
    startTimer();
  }
};


/**
 *@description reset player's moves
 *@param {number} moves
 *@returns {number} return moves to zero
 */
const resetMoves = () => {
  moves = 0;
  moveTally.innerHTML = `Moves: ${moves}`;
};

/**
 *@description Calculate star points based on moves taken
 *@param {array} stars
 *@returns {string} stars rating reduced based on moves taken
 */
const STARS = document.querySelectorAll('.fa-star');
let starsList = document.querySelectorAll('.stars li');

function currentStars() {
    if (moves > 20 && moves < 30) {
        for (i = 0; i < 3; i++) {
            if (i == 2) {
                STARS[i].style.visibility = 'collapse';
            }
        }
    } else if (moves >= 29) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                STARS[i].style.visibility = 'collapse';
            }
        }
    }
}

function resetStars() {
    for (i = 0; i < 3; i++) {
        STARS[i].style.visibility = 'visible';
    }
}


/**
 * @description game timer
 * @param {number} seconds
 * @param {number} minutes
 * @param {number} interval for incrementing time elapsed
 * @returns {string} current elapsed time
 */
const TIMER = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
let interval;

const startTimer = () => {
  interval = setInterval(function() {
    seconds++;
    TIMER.innerHTML = (seconds <= 9) ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

    if (seconds >= 59) {
      minutes++;
      seconds = -1;
    }
  }, 1000);
};

/**
 * @description reset timer on load and restart
 * @param {number} seconds
 * @param {number} minutes
 * @returns {string} resets elapsed time
 */
const resetTimer = () => {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  TIMER.innerHTML = `${minutes}:0${seconds}`;
};

/**
 * @description Start a new game
 * @param {number} seconds
 * @param {number} minutes
 * @returns {string} resets elapsed time
 */
const RESTART = document.querySelector('.restart');
RESTART.addEventListener('click', () => {
    resetTimer();
    resetStars();
    resetMoves();
    matchedCards = [];
    
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('face-up', 'match', 'disabled');
    }
    });


/**
 * @description Displays card when clicked
 */
function displayCard() {
  this.classList.add('face-up', 'disabled');
}

/**
 * @description Check if cards are a match. Disable if a match, return to face down if not.
 */
let match = document.getElementsByClassName('match');
let matchedCards = [];

function matchCheck() {
  matchedCards.push(this);
  let sets = matchedCards.length;
  if (sets === 2) {
    moveCounter();
    if (matchedCards[0].type === matchedCards[1].type) {
      matched();
    } else {
      mismatched();
    }
  }
}

/**
 * @description Match animation
 */
const matched = () => {
  matchedCards[0].classList.add('match');
  matchedCards[1].classList.add('match');
  matchedCards = [];
};

/**
 *@desciption Mismatch animation then flip cards face down
 */
const mismatched = () => {
  matchedCards[0].classList.add('mismatched');
  matchedCards[1].classList.add('mismatched');
  disable();
  setTimeout(function() {
    matchedCards[0].classList.remove('face-up', 'mismatched');
    matchedCards[1].classList.remove('face-up', 'mismatched');
    enable();
    matchedCards = [];
  }, 600);
};

/**
 * @description card disable
 */
 const disable = () => {
  [].filter.call(cards, card => {
    card.classList.add('disabled');
  });
};

/**
 * @description enables card play
 */
const enable = () => {
  [].filter.call(cards, card => {
    card.classList.remove('disabled');
    for (var i = 0; i < match.length; i++) {
      match[i].classList.add('disabled');
    }
  });
}

/**
 * @description Display results of game in modal upon completion
 */
let modal = document.getElementById('modal');

const results = () => {
  if (match.length == 16) {
    completionTime = TIMER.innerHTML;
    clearInterval(interval);
    modal.style.display = "block";

    let starRating = document.querySelector('.stars').innerHTML;
    document.getElementById('starRating').innerHTML = starRating;
    let resultsMsg = document.getElementById('resultsHeader');
    resultsMsg.insertAdjacentText('afterend', `You matched all the cards in ${completionTime} using ${moves} turns.`);

    closeModal();
  };
}

/**
 * @description Close results modal and reset page for new game
 */
let close = document.querySelector('.close-modal');

const closeModal = () => {
  close.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

const playAgain = () => {
    startGame();
    modal.style.display = "none";
}

for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', matchCheck);
  card.addEventListener('click', results);
}

document.body.onload = startGame();
