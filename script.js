import cards from "./data.js";
const cardElemanlari = document.querySelectorAll("#root > .card");
let eslesmeSayi = 0;
const headingEleman = document.querySelector("h2");
const imageElement = document.querySelector("#myGif");
imageElement.src = "./assets/gif/celebration.gif";

// Herbir Div için event listener eklendi
cardElemanlari.forEach((div) => {
  div.addEventListener("click", (event) => {
    selectCard(event.target.dataset.id);
  });
});

//seçilecek kart 2 lileri için Array
let selectedCards = [];

//kart seçim fonksiyonu
function selectCard(cardId) {
  const card = cards.find((c) => c.id === cardId);

  if (card.matched === true) {  // eşleşmiş kartlar tekrar seçilemez
    return;
  }
  if (selectedCards.length > 0 && selectedCards.find((c) => c.id === cardId)) {  // aynı kart iki defa kliklenerek seçilemez
    console.log("This card is already selected.");
    return;
  }

  if (card.matched ===false) {
    const cardElement = document.querySelector(`[data-id='${cardId}']`);
    flipCard(cardElement, card);

    if (selectedCards.length < 2) {
      selectedCards.push(card);
    }

    if (selectedCards.length === 2) {
      checkForMatch();

      // seçilen kartlar eşleşmiyorsa yarım saniye sonra tekrar kapat ve selectedcards arrayini boşalt
      if (selectedCards[0].matched === false) {
        setTimeout(() => {
          selectedCards.forEach((selectedCard) => {
            const cardEl = document.querySelector(
              `[data-id='${selectedCard.id}']`
            );
            flipCard(cardEl, selectedCard);
          });
          selectedCards = [];
        }, 500);
      } else {
        selectedCards = [];
      }
    }
  }
}

//kartların eşleşmesini kontrol eden fonksiyon
function checkForMatch() {
  if (selectedCards[0].value === selectedCards[1].value) {
    selectedCards[0].matched = true;
    selectedCards[1].matched = true;
    eslesmeSayi++;
    headingEleman.textContent = `Eşleşen Çift Sayısı: ${eslesmeSayi}`;

    //console.log(`eşleşti ${selectedCards[0].matched} ve ${selectedCards[1].matched}   ${selectedCards[0].id} ve ${selectedCards[1].id}`)
  }

  if (eslesmeSayi === 4) {
    playGif();
  }
}

// tüm kartlar oynatılınca çağrılacak gif oynatma fonksiyonu
function playGif() {
  imageElement.style.display = "block"; // GIF göster
  setTimeout(() => {
    imageElement.style.display = "none"; // 5 sn sonra gif gizle
  }, 5000);
}

//kart çevirme fonksiyonu
function flipCard(cardElement, card) {
  if (card.matched === true) {
    return;
  }

  if (cardElement.classList.contains("open")) {
    // Açık kartı kapatır
    cardElement.classList.remove("open");
    cardElement.classList.add("card_closed");
    cardElement.textContent = ""; 
  } else {
    // kapalı kart açar
    cardElement.classList.remove("card_closed");
    cardElement.classList.add("open");
    cardElement.textContent = card.value; // kartın değerini cards arrayının valuesu olarak gösterir
  }
}

//Rastgele 1 ile 99 arasında sayı üretir
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}


// 1 ve 99 arası 4 sayı çifti üretir
function createRandomPairsArray() {
  const pairsArray = new Array(8).fill(null); // arrayin içini nulll değeriyle dolduruyoruz ki çiftleri yerleştirirken kontrol edebilelim
  const usedNumbers = []; // kullanılan sayıları takip etmek amaçlı üretilen array
  const max = 99;
  const pairCount = 4;

  while (usedNumbers.length < pairCount) {
    const randomNumber = getRandomInt(max);

    // sayı daha önce kullanıldı mı kontrolü
    if (!usedNumbers.includes(randomNumber)) {
      usedNumbers.push(randomNumber);

      // sayı çifti için  array içinde boş index bulma döngüsü
      for (let i = 0; i < 2; ) {
        let index = Math.floor(Math.random() * pairsArray.length);
        if (pairsArray[index] === null) {  
          pairsArray[index] = randomNumber;
          i++;
        }
      }
    }
  }

  return pairsArray;
}

let pairsArray = createRandomPairsArray();
//console.log(pairsArray);

// üretilen değerleri cards arrayindeki elemanların value değerine atama fonksiyonu
function assignValuesToCards(cards, values) {
  if (cards.length !== values.length) {
    console.error("The number of values must match the number of cards.");
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    cards[i].value = values[i];
  }
}
assignValuesToCards(cards, pairsArray);
