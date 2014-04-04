$(document).ready(function () {

	var randomNumber = '',
		numGuesses = 0,
		inputString,
		theGuess,
		isItDecimal,
		userJustWon = false, 
		inputIsValid = false;

	console.log('Resetting game at the top of the page');
	resetGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function () {
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function () {
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- User makes a guess ---*/
	$("#guessButton").click(function (event) {
		event.preventDefault();
		console.log('Inside #guessButton - userJustWon is '+ userJustWon);
		if(userJustWon === false){
			console.log('Inside #guessButton-if - userJustWon is '+ userJustWon);
			inputString = $('#userGuess').val();
			isItDecimal = inputString.indexOf('.');
			theGuess = parseInt(inputString);
			$('form')[0].reset();
			validateNumber(isItDecimal, theGuess);
			if(inputIsValid === true){
				isTheGuessRight();
			}
			inputIsValid = false;
		} else{
			$("#feedback").text("Click '+New Game' to play again");
			document.getElementById("feedback").style.backgroundColor ="#000000";
		}
	});

	/*--- User wants a new game. ---*/
	$('.new').click(resetGame);

	/*--- FUNCTIONS ---*/
  	function resetGame() {
  		/*--- Reset the variables --*/
		randomNumber = '';
		numGuesses = 0;
		inputString;

		/*--- Reset the DOM ---*/
		$('#count').text(numGuesses);
		$("#guessList").find("li").remove();
		$("#feedback").text("Make Your Guess!");
		document.getElementById("feedback").style.backgroundColor ="#32CC3E";
		$('form')[0].reset();

		/*---Generate a new random number ---*/
		randomNumber = Math.floor((Math.random()*100)+1);
		userJustWon === false;
		console.log('The random number is '+ randomNumber);
		console.log('resetGame - userJustWon is '+ userJustWon);
	};

  	function validateNumber(isItDecimal,inputNumber) {
  		if (isItDecimal==-1) {
			if(!isNaN(inputNumber) && inputNumber!==''){
					if(inputNumber > 0 && inputNumber < 101){
						inputIsValid = true;
					} else{
						invalidInput();
					}
			}else{
				console.log(inputNumber, isNaN(inputNumber));
				invalidInput();
			}
		}else{
			invalidInput();
		}
  	};

  	function invalidInput() {
  		alert("Enter a number between 1 and 100 - Decimal point is not allowed!");
  	};

  	function isTheGuessRight() {
  		console.log('Inside isTheGuessRight');
  		console.log('The guess is ' + theGuess);
  		numGuesses++;
		$('#count').text(numGuesses);
		$('#guessList').append("<li>" + theGuess + "</li>");

		/* The following nested if statement is complicated. It would have been better done with a "case" statement
			but that is not available in javascript. 

			There are 6 cases for user guesses as follows:

			-Case 1 : Winner
			-Case 2 : Guess is not within 70 of the number
			-Case 3 : Guess is not within 50 of the number
			-Case 4 : Guess is not within 30 of the number
			-Case 5 : Guess is not within 10 of the number
			-Case 6 : Guess is within 5 of the number

		*/

		if(Math.abs(randomNumber-theGuess)===0) { /* Case 1 */
			$("#feedback").text("You WIN!!!");
			document.getElementById("feedback").style.backgroundColor ="#FF3A69";
			userJustWon = true;
		}else{ 
			if(Math.abs(randomNumber-theGuess) > 70) { /* Case 2 */
				$("#feedback").text("Brrr...Cold");
				document.getElementById("feedback").style.backgroundColor ="#5132CC";	

			}else{ 
				if(Math.abs(randomNumber-theGuess) > 50) { /* Case 3 */
					$("#feedback").text("Pretty cold");
					document.getElementById("feedback").style.backgroundColor ="#3270CC";	

				}else { /* else number 3 */
					if(Math.abs(randomNumber-theGuess) > 30) {/* Case 4 */
						$("#feedback").text("Warmer...");
						document.getElementById("feedback").style.backgroundColor ="#32CC32";
 
					}else { /* else number 4 */

						if(Math.abs(randomNumber-theGuess) > 10) {/* Case 5 */
							$("#feedback").text('Pretty warm...');
							document.getElementById("feedback").style.backgroundColor ="#CC3282";

						}else { /* Case 6*/
							if(Math.abs(randomNumber-theGuess) < 5) {/* Case 5 */
								$("#feedback").text("Smokin' HOT!!!");
								document.getElementById("feedback").style.backgroundColor ="#CC3257";
							}

						} 
					} 
				} 
			}
		} 
	}; 
});


