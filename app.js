/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score_1, score_2, active, current;

var diceTarget = document.querySelector(".dice");
initial();
function initial() {
  score_1 = 0;
  score_2 = 0;
  current = 0;
  active = 0;
  diceTarget.style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "player 2";
  document.querySelector('.btn-roll').disabled=false;
}

document.querySelector(".btn-roll").addEventListener("click", function () {
  // random no on dice
  var dice = Math.floor(Math.random() * 6) + 1;
  // display the no
  diceTarget.style.display = "block";
  diceTarget.src = "dice-" + dice + ".png";
  // update the current
  if (dice !== 1) {
    current += dice;
    document.querySelector("#current-" + active).textContent = current;
    if (current >=20 && active === 0) {
       document.querySelector('.btn-roll').disabled=true;
       document.getElementById("score-0").textContent = "Finish";
      document.getElementById("name-0").textContent = "WINNER";
    } else if(current >= 20 && active === 1) {
        current=0;
        document.querySelector('.btn-roll').disabled=true;
       document.getElementById("score-1").textContent = "Finish";
      document.getElementById("name-1").textContent = "WINNER";
    }
  } else {
    current = 0;
    if (active === 0) {
      score_1 = 0;
      document.querySelector("#score-0").textContent = score_1;
      document.querySelector("#current-" + active).textContent = current;
      active = 1;
      document.querySelector(".player-1-panel").classList.add("active");
      document.querySelector(".player-0-panel").classList.remove("active");
    } else {
      score_2 = 0;
      document.querySelector("#score-1").textContent = score_2;
      document.querySelector("#current-" + active).textContent = current;
      active = 0;
      document.querySelector(".player-0-panel").classList.add("active");
      document.querySelector(".player-1-panel").classList.remove("active");
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (active == 0) {
    score_1 = score_1 + current;
    document.getElementById("score-0").textContent = score_1;
    current = 0;
    document.getElementById("current-" + active).textContent = current;
    active = 1;
    document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("active");
  } else {
    score_2 = score_2 + current;
    document.getElementById("score-1").textContent = score_2;

    current = 0;
    document.getElementById("current-" + active).textContent = current;
    active = 0;
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
  }
});

document.querySelector(".btn-new").addEventListener("click", initial);
