$(document).ready(function(){

    // Draw starting board with question marks
    // Each square gets a row-column ID

    function drawQuestionBd(){
        output = "";

        var count = 1;
        for (var row = 0; row < 4; row++){
            output += "<div class = 'row'>"
            for(var col = 0; col < 4; col++){
                output += "<div class = 'sqr question' id='" + count + "'></div>"
                count++;
            }
            output += "</div>"
        }

        document.getElementById('board').innerHTML = output;
    }

    drawQuestionBd();

    // var board = [
    //     [1,2,5,8],
    //     [3,6,1,7],
    //     [4,3,8,2],
    //     [5,7,6,4]
    // ];

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

    // function drawBoard(){
    //     output = "";

    //     for(var row = 0; row < board.length; row++){
    //         output += "<div class = 'row'>"
    //         for(var i = 0; i < board[row].length; i++){
    //             output += "<div class = 'sqr " + boardDict[board[row][i]] +"'></div>"
    //         }
    //         output += "</div>"
    //     }

    //     document.getElementById('board').innerHTML = output;
    // }

    // drawBoard();

    function successMsg(){
        $("#msg").attr("class", "msgStyle");
        $('#pass').text("You PASSED!");
    }

    var doubles = 0;
    pair = [];
    var pause = false;
    var successes = 0;

    $(".sqr").click(function(){
        if(!pause){
            // check if already solved
            var status = $(this).attr("class");
            if (status.search("success") == -1){
                doubles++;
                // get id of square clicked
                var loc = $(this).attr("id");
                console.log("Picture was clicked");
                console.log("location of pic is", loc);
                console.log("doubles is", doubles);
                // get new pic
                $(this).attr("class", "sqr " + boardDict[loc % 8])
                // store loc of pic info
                pair.push(loc);
                console.log("Pair is", pair);
                // check to see if 2 pics have been clicked yet
                if (doubles == 2){
                    console.log("Since doubles is 2, checking for match");
                    pause = true;
                    window.setTimeout(checkPair,2000);
                }
            }
        }
    })

    function checkPair(){
        if (pair[0] % 8 == pair[1] % 8){
            console.log("It is a match");
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
        doubles=0;
        pause = false;
    }
            
    // $(".sqr").onclick="setTimeout(checkPair,3000)"

    //     var replaced = $(this).attr("pair_src");
    //     var original = $(this).attr("src");
    //     $(this).attr("src", replaced);
    //     $(this).attr("pair_src", original);
    // })
    // })

})