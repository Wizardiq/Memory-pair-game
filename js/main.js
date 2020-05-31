document.addEventListener("DOMContentLoaded",() => {
const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let openPairCards = 0;
const animationDuration = 1500;
const openCardDuration = 500;

function flipCard () {
	if (lockBoard) {
		return;
	}
	if(this === firstCard) {
		return;
	}

	this.classList.add("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
	} else {
		secondCard = this;

		checkMatch();
	}
}

function checkMatch() {
	if (firstCard.dataset.framework === secondCard.dataset.framework){
		disableCards();
		openPairCards++;
		if (openPairCards === 6) {
			setTimeout(endGame, animationDuration);
		}
	} else {
		unFlipCards();
	}
}


function disableCards() {
	lockBoard = true;
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);

	setTimeout(() => {
		firstCard.classList.add("open");
		secondCard.classList.add("open");
		
		resetBoard();
	}, openCardDuration);
}

function unFlipCards() {
	lockBoard = true;
	setTimeout (() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");

		resetBoard();
	}, animationDuration);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function endGame() {
	alert("Congratulations! You win!");
}


(function shuffle(){
	cards.forEach(card => {
		let position = Math.floor(Math.random()* 12);
		card.style.order = position;
	})
})();

cards.forEach(card => card.addEventListener("click", flipCard));

});
