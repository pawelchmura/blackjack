const hitBtn = document.getElementById('hitBtn');
const standBtn = document.getElementById('standBtn');
const initGameBtn = document.getElementById('initGameBtn');


hitBtn.addEventListener('click', Hit);
standBtn.addEventListener('click', stand);
initGameBtn.addEventListener('click', initGame);

const cardValue = {
    C02: 2, C03: 3, C04: 4, C05: 5, C06: 6, C07: 7, C08: 8, C09: 9, C10: 10, CJ: 10, CQ: 10, CK: 10, C01: 11,
    S02: 2, S03: 3, S04: 4, S05: 5, S06: 6, S07: 7, S08: 8, S09: 9, S10: 10, SJ: 10, SQ: 10, SK: 10, S01: 11,
    H02: 2, H03: 3, H04: 4, H05: 5, H06: 6, H07: 7, H08: 8, H09: 9, H10: 10, HJ: 10, HQ: 10, HK: 10, H01: 11,
    D02: 2, D03: 3, D04: 4, D05: 5, D06: 6, D07: 7, D08: 8, D09: 9, D10: 10, DJ: 10, DQ: 10, DK: 10, D01: 11
};

let deck = { ...cardValue };
let firstDCard;
let secondDCard;
let pPoints = 0;
let dPoints = 0;
let pAceCount = 0;
let dAceCount = 0;
let bet = 0;
let totalChips = 1000;
let playerWin;
let addedcards = 0;

function randomNumber(a) {
    return Math.floor(Math.random() * a);
}

function RandomCard() {
    const keys = Object.keys(deck);
    const a = keys.length;
    const card = keys[randomNumber(a)];
    delete deck[card];
    console.log(a);
    return card;
}

function updateScore(a) {
    while (pPoints > 21 && pAceCount > 0) {
        pPoints -= 10;
        pAceCount--;
    }
    while (dPoints > 21 && dAceCount > 0) {
        dPoints -= 10;
        dAceCount--;
    }
    document.getElementById('player-points').innerHTML = pPoints;
    if (a) {
        document.getElementById('dealer-points').innerHTML = dPoints;
    }
}

function stand() {
    dealerMove();
    updateScore(1);
function compare () {
    if (pPoints == 21 && addedcards == 0) {
        playerWin = (5/2)*bet;
        info(`Blackjack! You Win ${(5/2)*bet}`)
    }else if (pPoints > 21) {
        playerWin = 0;
        info('Dealer wins');
    } else if (dPoints === pPoints) {
        info(`Draw! you win ${bet}`);
        playerWin = bet;
    } else if (dPoints > 21 || pPoints > dPoints) {
        playerWin = 2 * bet;
        info(`You Win ${2 * bet}$!`);
    } else {
        playerWin = 0;
        info('Dealer wins');
    }
    totalChips += playerWin;
    document.getElementById('total-chips').innerHTML = `Total Chips Value: ${totalChips}$`;
    }
    setTimeout(compare, 300);

}

function initGame() {
    resetRound();
    pPoints = 0;
    dPoints = 0;
    pAceCount = 0;
    dAceCount = 0;

    let firstPCard = RandomCard();
    firstDCard = RandomCard();
    let secondPCard = RandomCard();
    secondDCard = RandomCard();

    bet = parseInt(document.getElementById('bet-value').value);
    totalChips -= bet;
    document.getElementById('total-chips').innerHTML = `Total Chips Value: ${totalChips}$`;

    pPoints = cardValue[firstPCard] + cardValue[secondPCard];
    dPoints = cardValue[firstDCard] + cardValue[secondDCard];

    if (cardValue[firstPCard] === 11) pAceCount++;
    if (cardValue[secondPCard] === 11) pAceCount++;
    if (cardValue[firstDCard] === 11) dAceCount++;
    if (cardValue[secondDCard] === 11) dAceCount++;

    document.getElementById('player-cards').innerHTML =
        `<img src="images/${firstPCard}.jpeg" class="card">
         <img src="images/${secondPCard}.jpeg" class="card">`;

    document.getElementById('dealer-cards').innerHTML =
        `<img src="images/${firstDCard}.jpeg" class="card">
         <img src="images/back.jpeg" class="card">`;

    updateScore(false);

    if (pPoints === 21) {
        stand();
        if (dPoints === pPoints) {
            
            playerWin = bet;
            totalChips += playerWin;
        } else {
            playerWin = (5 / 2) * bet;
            totalChips += playerWin;
        }
    }
}

function Hit() {
    addedcards++;
    let newPCard = RandomCard();
    document.getElementById('player-cards').innerHTML += `<img src="images/${newPCard}.jpeg" class="card">`;
    pPoints += cardValue[newPCard];
    if (cardValue[newPCard] === 11) {
        pAceCount++;
    }
    updateScore(false);
    if (pPoints > 21) {
        stand();
        document.getElementById('player-points').innerHTML = pPoints;
    }
    
     
}

function dealerMove() {
    document.getElementById('dealer-cards').innerHTML =
        `<img src="images/${firstDCard}.jpeg" class="card">
         <img src="images/${secondDCard}.jpeg" class="card">`;
    
    while (dPoints < 17) {
        let newDCard = RandomCard();
        dPoints += cardValue[newDCard];
        document.getElementById('dealer-cards').innerHTML += `<img src="images/${newDCard}.jpeg" class="card">`;
        if (cardValue[newDCard] === 11) {
            dAceCount++;
        }
        updateScore(true);
    }
    updateScore(true);
}
function resetRound() {
    document.getElementById('dealer-points').innerHTML = '';
    document.getElementById('player-points').innerHTML = '';
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '<img src="images/back.jpeg" class="card"><img src="images/back.jpeg" class="card">';
    deck = { ...cardValue };
    addedcards = 0;
    info('');
}


const alerts = document.getElementById('alerts');

function info (information) {
    alerts.innerHTML = information;
};