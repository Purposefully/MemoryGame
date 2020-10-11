$(document).ready(function(){

    // Randomize an array of numbers 1 to 16
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    /* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Draw starting board with question marks
    // Each square gets a row-column ID to identify pic
    // Used randomized ID to mix up the pictures
    function drawQuestionBd(){
        output = "";

        var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        array2 = shuffleArray(array);
        var count = 0;
        for (var row = 0; row < 4; row++){
            output += "<div class = 'row'>"
            for(var col = 0; col < 4; col++){
                output += "<div class = 'sqr question' id='" + array[count] + "'></div>"
                count++;
            }
            output += "</div>"
        }

        document.getElementById('board').innerHTML = output;
    }

    drawQuestionBd();

    // Once all squares are matched, print this message:
    function successMsg(){
        $("#msg").attr("class", "msgStyle");
        $('#pass').text("You PASSED!");
        $('button').attr("class", "showButton");
        $('button').text("Click to continue");
        $('button').click(function(){
            window.location.href = "final.html";
        })
    }

    var boardDict = {
        0: 'pie',
        1: 'cat',
        2: 'fire',
        3: 'waterfall',
        4: 'tent',
        5: 'hike',
        6: 'guitar',
        7: 'faith',
    }

    // Keeps track of when 2 squares have been clicked
    var doubles = 0;
    // Tracks which two pictures have been clicked
    pair = [];
    // only allows two squares to be clicked at a time
    // pauses to allow pictures to be seen before moving on
    var pause = false;
    // Keeps track of how many pairs have been found
    var successes = 0;

    // What to do when a square gets clicked
    $(".sqr").click(function(){
        if(!pause){
            // check if already solved
            var status = $(this).attr("class");
            if (status.search("success") == -1){
                doubles++;
                // get id of square clicked
                var loc = $(this).attr("id");
                // replace ? with new pic
                $(this).attr("class", "sqr " + boardDict[loc % 8])
                // store loc of pic info
                pair.push(loc);
                // check to see if 2 pics have been clicked yet
                if (doubles == 2){
                    pause = true;
                    window.setTimeout(checkPair,1000);
                }
            }
        }
    })

    // Once two pictures have been clicked, checks to see if it is a match
    function checkPair(){
        if (pair[0] % 8 == pair[1] % 8){
            $("#" + pair[0]).attr("class", "sqr success");
            $("#" + pair[1]).attr("class", "sqr success");
            successes++;
            if(successes == 8){
                successMsg();
            }
        }
        else{
            $("#" + pair[0]).attr("class", "sqr question");
            $("#" + pair[1]).attr("class", "sqr question");
        }
        pair = [];
        doubles = 0;
        pause = false;
    }

})