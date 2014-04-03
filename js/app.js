
$(document).ready(function () {

	var randomNumber = '',
		numGuesses = 0,
		inputString,
		theGuess,
		isItDecimal,
		lastNumberGuessed;
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
		numGuesses++;
		$('#count').text(numGuesses);
		inputString = $('#userGuess').val();
		isItDecimal = inputString.indexOf('.');
		theGuess = parseInt(inputString);

		$('form')[0].reset();
		validateNumber(isItDecimal, theGuess);
		$('#guessList').append("<li>" + theGuess + "</li>");
		isTheGuessRight();
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

		/*---Generate a new random number ---*/
		randomNumber = Math.floor((Math.random()*100)+1)
		console.log('The random number is '+ randomNumber);
	};

  	function validateNumber(isItDecimal,inputNumber) {
  		if (isItDecimal==-1) {
			if(!isNaN(inputNumber) && inputNumber!==''){
					if(inputNumber > 0 && inputNumber < 101){
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
  		console.log('The guess is ' + theGuess);

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
							$("#feedback").text('Really warm...');
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


