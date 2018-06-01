// VARIABLES
// ===============================================
// currentProgress shows the word as the user guess with unguessed letters as _
// allGuesses contains the guesses the user has chosen
// chosenWord is the word the user is trying to guess
// qt is double quotes around the lastWord, if the user fails to guess the word
// guessesRemaining is how many guesses the user has left
// wins is wins
// losses is losses

var currentProgress = [];
var allGuesses = [];
var chosenWord = "";
var qt = "''";
var lastWord = " ";
var guessesRemaining = 0;
var wins = 0;
var winStreak = 0;
var losseStreak = 0;

function start() {
	// create array with possible word choices
	var possibleWords = ['chair', 'volt', 'watt', 'franklin', 'wire', 'amperage', 'charged', 'bolt', 'fence', 'shocking', 'power', 'lightning', 'amperes', 'megajoules', 'coulombs', 'thunderbolt', 'electricity'];
	// choose a word at random
	chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
	//console.log(chosenWord);

	// tell user how many guesses he has left
	//guessesRemaining = chosenWord.length + ?;
	guessesRemaining = 12;
	$('#guessesLeft').append(guessesRemaining);
	$('#wins').empty();
	$('#wins').append(wins);
	$('#losses').empty();
	$('#losses').append(losses);
	


	// Guess This Word
	// show user currentProgress (and how many letters are in the chosenWord)
	// currentProgress _ equal to the number of letters in the chosenWord
	for (var i = 0; i < chosenWord.length; i++) {
		chosenWord[i] = currentProgress.push("_");
	}
	// append _ word to the page
	$('#currentProgress').empty();
	$('#currentProgress').append(currentProgress.join(" "));
}

// LOG USER INPUT
// ===============================================
$(document).keydown(function (event) {
	// grabs user input and makes it lower case
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// if user input is not a letter, alert.
	// if user input is a letter, continue.
	var letter = /^[a-z]+$/;
	if (!userGuess.match(letter)) {
		alert('Please input letters only.')
	} else {
		for (var i = 0; i < chosenWord.length; i++) {
			if (chosenWord.charAt(i) == userGuess) {
				currentProgress[i] = userGuess;
				$('#currentProgress').empty();
				$('#currentProgress').append(currentProgress.join(" "));
			}
		}

		// User Guesses Incorrectly
		// check allGuesses array to see if userGuess exists. If not, add it to the array
		if (allGuesses.indexOf(userGuess) == -1 && chosenWord.indexOf(userGuess) == -1) {
			allGuesses.push(userGuess);
			// decrement the number of guesses remaining
			// show guessesRemaining to the user
			guessesRemaining -= 1;
			$('#guessesLeft').empty();
			$('#guessesLeft').append(guessesRemaining);
		}
		// show lettersGuessed to the user
		$('#lettersGuessed').empty();
		$('#lettersGuessed').append(allGuesses.join(", "));

		// User Wins
		// if user has replaced all _ with the correct letter
		// increment the number of wins and ask user to play again
		if (currentProgress.indexOf("_") == -1) {
			wins += 1;
			winStreak +=1;
			losseStreak = 0;
			$('#wins').empty();
			$('#wins').append(wins);
			setTimeout(function () {
			if (winStreak == 1) {
				var again = confirm("You just got lucky!\n\nPlay again?");
			}
			if (winStreak == 2) {
				var again = confirm("Did you used a lifline?\n\nPlay again?");
			}
			if (winStreak == 3) {
				var again = confirm("Woa, slow down partner!\n\nPlay again?");
			}
			if (winStreak == 4) {
				var again = confirm("Go to Las Wages!\n\nPlay again?");
			}
			if (winStreak >= 5) {
				var again = confirm("Did you team up with Wattson?\n\nPlay again?");
			}
				
				if (again == true) {
					resetjs();
				}
			}, 250);
		}

		// User Loses
		// if user has run out of guesses
		if (guessesRemaining == 0) {
			losses += 1;
			losseStreak += 1;
			winStreak = 0;
			lastWord = chosenWord;
			$('#losses').empty();
			$('#losses').append(losses);
			setTimeout(function () {
				if (losseStreak == 1) {
					var again = confirm("hehehehe!\n\nPlay again?");
				}
				if (losseStreak == 2) {
					var again = confirm("Spelling counts! :)\n\nPlay again?");
				}
				if (losseStreak == 3) {
					var again = confirm("Frustrated?\n\nPlay again?");
				}
				if (losseStreak == 4) {
					var again = confirm("Ah, you are not trying, that makes sense!\n\nPlay again?");
				}
				if (losseStreak >= 5) {
					var again = confirm("Take the monkey away from the keyboard!\n\nPlay again?");
				}
				var again = confirm("The word was " +qt+lastWord+qt+ ".\n\nJerry's game won!\n\nPlay again? ");
				if (again == true) {
					resetjs();
				}
			}, 250);
		}
	}
});


// reset current after user wins or loses.
function resetjs() {
	currentProgress = [];
	allGuesses = [];
	chosenWord = ' ';
	userGuess = ' ';
	guessesRemaining = 0;
	$('#currentProgress').empty();
	$('#guessesLeft').empty();
	$('#lettersGuessed').empty();
	start();
}
start();