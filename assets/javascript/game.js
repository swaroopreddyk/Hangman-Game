$(document).ready(function (){
    var wordsList = ["ironman", "thor", "avengers", "ultron", "jarvis", "vision", "blackwidow", "thanos", "inifinity", "marvel", "hulk", "antman", "spiderman"];
    var guessesRemaining = 7;
    var randomWord = wordsList[Math.floor((Math.random() * wordsList.length))];
    var underScoreWord = "";
    var letterGuess = [];
    var indexes = [];
    //The below variable is used as a flag to check if the key pressed is in the randomword selected
    var charMatchFlag = false;
    var wins = 0;
    var losses = 0;


    //call underscore function to display randomWord underscores
    underScores();

    playHeaderVideo();

    //listen for keypress, and run function
    document.addEventListener('keypress', function (event) {

        letterGuess.push(String.fromCharCode(event.keyCode));
        for (var j = 0; j < randomWord.length; j++) {
            if (randomWord[j] === letterGuess[letterGuess.length - 1]) {
                charMatchFlag = true;
                indexes.push(j);
                var splitWord = underScoreWord.split("");

                //this is to replace the underscore with the matched character
                for (k = 0; k < indexes.length; k++) {
                    splitWord[indexes[k]] = letterGuess[letterGuess.length - 1];
                    indexes = [];
                    underScoreWord = splitWord.join("");
                }
            }
        }

        //if-else to check if the key pressed is a matched character or not
        if (charMatchFlag) {
            document.getElementById('randomWord').innerHTML = underScoreWord;
            // the below operation removes the character that is matched with the character from the random word so only characters that are not yet pressed remain in the array
            letterGuess.pop();
        } else {
            // If keypress has no matches, we need to decrement the # guesses by 1 and display the letter pressed
            guessesRemaining--
            document.getElementById('guessed').innerHTML = letterGuess;
            document.getElementById('remainingGuesses').innerHTML = "Guesses Remaining: " + guessesRemaining;
        }

        charMatchFlag = false;
        checkWin();
        images();
    });

    // Function to generate '_' based on the length of the random word selected
    function underScores() {
        for (var i = 0; i < randomWord.length; i++) {
            underScoreWord += "_";
        }
        document.getElementById('randomWord').innerHTML = underScoreWord;
    }

    // the below function checks if the user won or lost based and updates the win/loss counters as well
    function checkWin() {
        if (underScoreWord === randomWord) {
            wins++;
            document.querySelector('#wins').innerHTML = "<p>" + wins + "</p>";
            document.querySelector('#losses').innerHTML = "<p>" + losses + "</p>";
            alert("You Win! Page will be refreshed once you hit ok.");
            reset();
        } else if (guessesRemaining === 0) {
            console.log("reached loss");
            losses++;
            document.querySelector('#losses').innerHTML = "<p>" + losses + "</p>";
            document.querySelector('#wins').innerHTML = "<p>" + wins + "</p>";
            alert("You Lose! Page will be refreshed once you hit ok. \n\n The Word is "+ randomWord);
            reset();
        }
    }

    // this function replaces the image on the screen based on the number of guesses left
    function images() {
        switch (guessesRemaining) {
            case 0:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-7.png height='400'/>";
                break;
            case 1:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-6.png height='400'/>";
                break;
                // you enable the hint here because we are decreasing the count by 1 everytime the user guesses wrong 
            case 2:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-5.png height='400'/>";
                document.getElementById('hint').style.display = 'block';
                break;
            case 3:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-4.png height='400'/>";
                break;
            case 4:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-3.png height='400'/>";
                break;
            case 5:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-2.png height='400'/>";
                break;
            case 6:
                document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-1.png height='400'/>";
                break;
            default:
                // do nothing when you encounter any other number greater than 6
                // also the reset function takes care of assigning the default hangman image when the guessesRemaining is 7
                break;

        }
    }

    // once the user won/lost and the alert is displayed, this block will be executed to restart the game again by resetting a few of the stats
    function reset() {
        document.getElementById('hint').style.display = 'none';
        randomWord = wordsList[Math.floor((Math.random() * wordsList.length))];
        document.getElementById('randomWord').innerHTML = randomWord;
        document.getElementById('hangman').innerHTML = "<img src=assets/images/hangman-0.png height='400'/>";
        underScoreWord = "";
        letterGuess = [];
        indexes = [];
        charMatchFlag = false;
        document.getElementById('guessed').innerHTML = letterGuess;
        underScores();
        guessesRemaining = 7;
    }

    function playHeaderVideo(){
        var videoElement = document.createElement("video");
        videoElement.setAttribute("src", "assets/media/Marvel_studios_Intro.mp4");
        videoElement.load();
        $("#mainHeader").append(videoElement);
        videoElement.play();

        videoElement.addEventListener('ended', function(e) {
            videoElement.loop();
          }, false);
    }

})