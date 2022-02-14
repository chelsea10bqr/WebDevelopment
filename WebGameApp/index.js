let card = document.getElementsByClassName("card");
let cards = [...card];
let moves = 0;
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
let closeicon = document.querySelector(".close");
let  metric= document.getElementById("popup1");
const deck = document.getElementById("card-deck");
var storage = [];
let least = document.getElementById("best");
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
var interval2;

function setCookie(name,nummoves,expire) {
    var date = new Date();
    date.setTime(date.getTime() + (expire*24*60*60*1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + nummoves+ ";" + expires + ";path=/";
}

// Function to get the cookie
function getCookie(name) {
    var na = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(na) == 0) {
            return c.substring(na.length, c.length);
        }
    }
    return "";
}


/*random shuffle the 16 cards*/
function shuffle(array) {
    var cur = array.length, temp, rand;
    for (cur; cur>0;cur--) {
        rand = Math.floor(Math.random() * cur);
        cur -= 1;
        temp = array[cur];
        array[cur] = array[rand];
        array[rand] = temp;
    }
    return array;
};

document.body.onload = startGame();  /*load the game*/

function startGame(){
    storage = [];
    cards = shuffle(cards);
    least.innerHTML=localStorage.getItem("least");
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);

        });

        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    moves = 0;
    counter.innerHTML = moves;

    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    clearInterval(interval2);
}

var displayCard = function (){                        /*display the card*/
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

             /*control for the periodic shuffle*/
function cardOpen() {
    storage.push(this);
    var len = storage.length;
    if(len === 2){
        count();
        if(storage[0].type === storage[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

function matched(){                                       /*display the matched cards*/
    storage[0].classList.add("match", "disabled");
    storage[1].classList.add("match", "disabled");
    storage[0].classList.remove("show", "open", "no-event");
    storage[1].classList.remove("show", "open", "no-event");
    storage = [];
}

function unmatched(){                        /*close the unmatched cards*/
    storage[0].classList.add("unmatched");
    storage[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        storage[0].classList.remove("show", "open", "no-event","unmatched");
        storage[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        storage = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function count(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
        interval2 = setInterval(function(){
            cards = shuffle(cards);

            for (var i = 0; i < cards.length; i++){
                deck.innerHTML = "";
                [].forEach.call(cards, function(item) {
                    deck.appendChild(item);

                });

                cards[i].classList.remove("show", "open", "match", "disabled");
            }
        },Math.floor(Math.random() * 20+20)*1000);
    }

}


function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function finishmatch(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        clearInterval(interval2);
        finalTime = timer.innerHTML;

        metric.classList.add("show");


        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
        let temp = localStorage.getItem("least");
        if(temp==null||moves<temp) {
            localStorage.setItem("least", moves);
        }
        closeMetric();
    };
}

function closeMetric(){
    closeicon.addEventListener("click", function(e){
        metric.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    metric.classList.remove("show");
    startGame();
}

for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",finishmatch);
};