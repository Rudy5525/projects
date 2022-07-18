import Card from "./Card.js";
const movies = [
  {
    id: 1,
    name: "Thor",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/mfjJLZK9JvflsKM3gVMnX7QJzKJ.jpg",
    director: "Kenneth Branagh",
    year: 2011,
  },
  {
    id: 2,
    name: "Avengers: Infinity War",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/zLLs37yOubp9Snt5n1UE0DKvWGo.jpg",
    director: "Anthony Russo",
    year: 2018,
  },
  {
    id: 3,
    name: "Ted",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/osJNr64CNyGhCzdlg6oHt3a6vNA.jpg",
    director: "Seth MacFarlane",
    year: 2012,
  },
  {
    id: 4,
    name: "Kung Fu Panda",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
    director: "Mark Osborne",
    year: 2008,
  },
  {
    id: 5,
    name: "Jurassic Park",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/6PahEke329HOQx1QOqlo12e4YXa.jpg",
    director: "Michael Crichton",
    year: 1993,
  },
  {
    id: 6,
    name: "Shrek",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg",
    director: "Andrew Adamson",
    year: 2001,
  },
  {
    id: 7,
    name: "Spider-Man",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    director: "Sam Raimi",
    year: 2002,
  },
  {
    id: 8,
    name: "Spider-Man: No Way Home",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/1Pb65hcIv4ymPBbH7ycRM2UUcga.jpg",
    director: "Jon Watts",
    year: 2021,
  },
  {
    id: 9,
    name: "Shrek Forever",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/mAn7hsIH0HgVVQOylvldl1HzySE.jpg",
    director: "Mike Mitchell",
    year: 2010,
  },
  {
    id: 10,
    name: "The Shawshank Redemption",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    director: "Frank Darabont",
    year: 1994,
  },
  {
    id: 11,
    name: "Death Note",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/vapuYy7yrYcML9bHuq5ct97hpSY.jpg",
    director: "Shusuke Kaneko, Hideo Nakata, Shinsuke Sato",
    year: 2006,
  },
  {
    id: 12,
    name: "Game of Thrones",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/rz4fSqurRILu7IcAKCIgUCYJouV.jpg",
    director: "David Benioff, D. B. Weiss",
    year: 2011,
  },
  {
    id: 13,
    name: "Fantastic Beasts: The Secrets of Dumbledore",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/cekxVfkFg0T8KUUmJjhEkJmY09S.jpg",
    director: "David Yates",
    year: 2022,
  },
  {
    id: 14,
    name: "Pirates of the Caribbean: The Curse of the Black Pearl",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/uqReraSvOaQXLkFp3TjqQQT2daf.jpg",
    director: "Gore Verbinski",
    year: 2003,
  },
  {
    id: 15,
    name: "The Walking Dead",
    imgURL:
      "https://www.themoviedb.org/t/p/w1280/rqeYMLryjcawh2JeRpCVUDXYM5b.jpg",
    director: "Frank Darabont",
    year: 2010,
  },
];
const button = document.querySelector(".addMovie-btn");
const modal = document.querySelector(".modal");
const movieList = document.querySelector(".modal--window__grid");
const closeModalButton = document.querySelector(".close-modal__icon");
let frame;
let cards;
let cardsID = [];

// Checks if there are any movies stored in localStorage, if there are - prints them on the screen
if (localStorage.length > 0) {
  cards = [...getFromLS()];
  cards.forEach((card) => {
    cardsID.push(card.id);
  });
  // Prints stored movies on the screen
  cards.forEach((card) => {
    appendToSite(card);
  });
} else {
  cards = [];
}
// Adds movies list to modal window
movies.forEach((movie) => {
  let div = document.createElement("div");
  let img = document.createElement("img");
  let p = document.createElement("p");

  div.classList.add("card", "card--small");
  p.classList.add("card--small__title");
  img.src = movie.imgURL;
  img.alt = movie.name;
  p.textContent = movie.name;

  div.appendChild(img);
  div.appendChild(p);
  div.addEventListener("click", () => {
    closeModal();
    // Checks if movie is already in library
    if (cardsID.includes(movie.id)) {
      return console.log("Error: Movie already in library");
    }
    addMovie(movie);
  });

  movieList.appendChild(div);
});
// Adds movie to the screen and to localStorage after choosing from modal window
function addMovie(movie) {
  cards.push(
    new Card(movie.id, movie.name, movie.director, movie.imgURL, movie.year)
  );
  cardsID.push(movie.id);
  appendToSite(movie);
  updateLS();
}

// -------------------------------------------------------------------------------
//              Functions to create new card on main screen
// ---------------------------------------------------------------------------------

// Creates card wrapper and appends it to site, before new movie frame
function appendToSite(card) {
  const elem = document.querySelector(".new-movie-frame");
  let outerDiv = document.createElement("div");
  outerDiv.classList.add("card-wrapper");
  outerDiv.dataset.id = `${card.id}`;
  let frontCard = createFrontCard(card, outerDiv);
  let removeCardBtn = createBtn(frontCard);
  let backCard = createBackCard(card);

  outerDiv.addEventListener("click", () => {
    outerDiv.classList.toggle("card-flip");
    stopAnimation(frontCard);
  });

  frontCard.appendChild(removeCardBtn);
  outerDiv.appendChild(frontCard);
  outerDiv.appendChild(backCard);
  elem.before(outerDiv);
}
// Creates front of the card and its animation
function createFrontCard(card, outerDiv) {
  let frontCard = document.createElement("div");
  frontCard.classList.add("card", "card-front");
  frontCard.insertAdjacentHTML(
    "beforeend",
    `<img src= ${card.imgURL} alt=${card.name}>`
  );

  let position, centerX, centerY;

  frontCard.addEventListener("mouseenter", (e) => {
    position = outerDiv.getBoundingClientRect();
    centerX = (position.right - position.left) / 2 + position.left;
    centerY = (position.bottom - position.top) / 2 + position.top;
  });
  // Adds 3d rotation effect when hovered to front side of the card
  frontCard.addEventListener("mousemove", (e) => {
    let mouseX = e.x;
    let mouseY = e.y;
    let rotateY = (centerX - mouseX) / 100;
    let rotateX = (centerY - mouseY) / 150;

    frontCard.style.setProperty("--rotateY", `${rotateY}`);
    frontCard.style.setProperty("--rotateX", `${-rotateX}`);

    if (Math.abs(rotateX) > Math.abs(rotateY)) {
      frontCard.style.setProperty("--angle", `${rotateX * 30}`);
    } else {
      frontCard.style.setProperty("--angle", `${rotateY * 30}`);
    }
    frontCard.style.setProperty("--shadowX", `${rotateY * 30}`);
    frontCard.style.setProperty("--shadowY", `${rotateX * 45}`);
  });

  frontCard.addEventListener("mouseleave", () => {
    stopAnimation(frontCard);
  });

  return frontCard;
}
// Creates back of the card
function createBackCard(card) {
  let backCard = document.createElement("div");
  backCard.classList.add("card", "card-back");
  backCard.insertAdjacentHTML(
    "beforeend",
    `<p class='card-back-p'>Name:<br><span class='card-back-span'>${card.name}</span></p>
      <p class='card-back-p'>Director:<br><span class='card-back-span'>${card.director}</span></p>
      <p class='card-back-p'>Year:<br><span class='card-back-span'>${card.year}</span></p>`
  );
  return backCard;
}
// Creates button to remove a movie from library
function createBtn(div) {
  let removeCardBtn = document.createElement("div");
  removeCardBtn.classList.add("remove-btn");
  removeCardBtn.insertAdjacentHTML(
    "beforeend",
    `<svg
        xmlns="http://www.w3.org/2000/svg"
        class="trash-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>`
  );
  // Removes movie from screen, arrays and localStorage after clicking
  removeCardBtn.addEventListener("click", () => {
    cards.forEach((card, index) => {
      if (div.dataset.id == card.id) {
        cardsID.splice(cardsID.indexOf(Number(div.dataset.id)), 1);
        div.style.display = "none";
        cards.splice(index, 1);
        updateLS();
      }
    });
  });
  return removeCardBtn;
}

// ----------------------------------------------------
//              Helper functions
// ----------------------------------------------------

function updateLS() {
  let cardsSerialized = JSON.stringify(cards);
  localStorage.setItem("Cards", cardsSerialized);
}
function getFromLS() {
  return JSON.parse(localStorage.getItem("Cards"));
}
function closeModal() {
  modal.classList.remove("modal__active");
}
function openModal() {
  modal.classList.add("modal__active");
}
function stopAnimation(card) {
  card.style.setProperty("--rotateX", 0);
  card.style.setProperty("--rotateY", 0);
  card.style.setProperty("--shadowX", 0);
  card.style.setProperty("--shadowY", 0);
}
button.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
