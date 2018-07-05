let cards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];

let openCards=[] ;
let Counter=0;
let moves=document.querySelector('.moves');
let restartBtn=document.querySelector('.restart');
let deck=document.querySelector('.deck');
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initiate(){
    cards = shuffle(cards);
    let deck = document.querySelector('.deck');
    for(let i=0;i<cards.length;i++)
    {
        let card = document.createElement('li');
        card.className='card';
        let pic=document.createElement('i');
        pic.className=cards[i];
        card.appendChild(pic);
        deck.appendChild(card);
    }
}

initiate();


function match(firstCard,secondCard)
{
    if(firstCard.firstChild.className==secondCard.firstChild.className)
    {
        firstCard.className='card match';
        secondCard.className='card match';
        return true;
    }
    return false;
}

function notMatch(firstCard,secondCard)
{
    firstCard.className='card';
    secondCard.className='card';
}

function showforawhile(card,callback){
     setTimeout(()=>{
        callback('done')
    },200)
    console.log('should show ')
    card.classList.add('show');
    card.classList.add('open');
}

function AddCard(card)
{
    if(openCards.length==0)
        {
             card.classList.add('show');
             card.classList.add('open');
            openCards.push(card);
        }
    else 
        {
             showforawhile(card,()=>{
                firstCard=openCards[0];
                let isMatch = match(firstCard,card);
                console.log(firstCard.className+" "+card.className);
                if(!isMatch)notMatch(firstCard,card);
                openCards=[];
            })
                
           
        }
}


function updateStars(){
    let thirdStar=document.querySelector('#third');
    let secondStar=document.querySelector('#second');

    if(Counter==19)
    { 
        thirdStar.className="fa fa-star-o";
    }
    else if(Counter==25)
    {
         secondStar.className="fa fa-star-o";   
    }
    else if(Counter==0)
    {
        thirdStar.className="fa fa-star";
        secondStar.className="fa fa-star";   

    }
}

deck.addEventListener('click',function(Event){
    if (Event.target.nodeName==='LI'&&Event.target.className==="card")
    {
          
           Counter++;
           moves.textContent=Counter;
           updateStars();
          AddCard(Event.target)
          
    }
})

function clear()
{
    for(let i=0;i<cards.length;i++)
        deck.firstElementChild.remove();
}

restartBtn.addEventListener('click',function(Event){
    
    clear();
    initiate();
    Counter=0;
    moves.textContent=Counter;
    updateStars();
    
})
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a list of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */