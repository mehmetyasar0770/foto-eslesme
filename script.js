
import cards from "./data.js";
const cardElemanlari =  document.querySelectorAll('#root > .card');
let eslesmeSayi= 0
const headingEleman = document.querySelector("h2")
const imageElement = document.querySelector ("#myGif")
imageElement.src = './assets/gif/celebration.gif';




cardElemanlari.forEach((div) => {
  div.addEventListener('click', function() {
    selectCard(this.dataset.id);
  });
});
  

let selectedCards = [];
  
  function selectCard(cardId) {
    const card = cards.find(c => c.id === cardId);
    
    if (card.matched===true) {
      return;
    }
    if (selectedCards.length > 0 && selectedCards.find(c => c.id === cardId)) {
      console.log("This card is already selected.");
      return;
    }

    if (!card.matched) {
      const cardElement = document.querySelector(`[data-id='${cardId}']`);
      flipCard(cardElement, card);
  
    if (selectedCards.length < 2) {
      selectedCards.push(card);
    }
  
    if (selectedCards.length === 2) {
      //console.log ("seçilen kartlar" + selectedCards[0].id + "ve " + selectedCards[1].id)
      checkForMatch();

      if (selectedCards[0].matched === false) {
        setTimeout(() => {
            selectedCards.forEach(selectedCard => {
            const cardEl = document.querySelector(`[data-id='${selectedCard.id}']`);
            flipCard(cardEl, selectedCard);
          });
          selectedCards = [];
        }, 500);
      } else {
        selectedCards = [];
      }
    }
  }}
  
  
  function checkForMatch() {
   if (selectedCards[0].value === selectedCards[1].value) {
      selectedCards[0].matched = true;
      selectedCards[1].matched = true;
      eslesmeSayi++
      headingEleman.textContent = `Eşleşen Çift Sayısı: ${eslesmeSayi}`

      //console.log(`eşleşti ${selectedCards[0].matched} ve ${selectedCards[1].matched}   ${selectedCards[0].id} ve ${selectedCards[1].id}`)
    } 
  
    if (eslesmeSayi === 4) {
        playGif()
    }
    
    
  }

  function playGif() {
    imageElement.style.display = 'block';  // Show the GIF
    setTimeout(() => {
      imageElement.style.display = 'none'; // Hide the GIF after 5 seconds (5000 milliseconds)
    }, 5000);
  }
  
 
  
  
  


  function flipCard(cardElement, card) {
    if (card.matched === true) {
      return;
    }

    if (cardElement.classList.contains('open')) {
      // Card is open, flip it to close
      cardElement.classList.remove('open');
      cardElement.classList.add('card_closed');
      cardElement.textContent = ''; // Hide card value or change to a back image
    } else {
      // Card is closed, flip it to open
      cardElement.classList.remove('card_closed');
      cardElement.classList.add('open');
      cardElement.textContent = card.value; // Show card value
    }
  }
  

