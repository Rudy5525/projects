import Card from "./Card.js";
const moviesOffline = [
  {
    id: 1,
    title: "Thor",
    image:
      "https://www.themoviedb.org/t/p/w1280/mfjJLZK9JvflsKM3gVMnX7QJzKJ.jpg",
    crew: "Kenneth Branagh",
    year: 2011,
  },
  {
    id: 2,
    title: "Avengers: Infinity War",
    image:
      "https://www.themoviedb.org/t/p/w1280/zLLs37yOubp9Snt5n1UE0DKvWGo.jpg",
    crew: "Anthony Russo",
    year: 2018,
  },
  {
    id: 3,
    title: "Ted",
    image:
      "https://www.themoviedb.org/t/p/w1280/osJNr64CNyGhCzdlg6oHt3a6vNA.jpg",
    crew: "Seth MacFarlane",
    year: 2012,
  },
  {
    id: 4,
    title: "Kung Fu Panda",
    image:
      "https://www.themoviedb.org/t/p/w1280/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
    crew: "Mark Osborne",
    year: 2008,
  },
  {
    id: 5,
    title: "Jurassic Park",
    image:
      "https://www.themoviedb.org/t/p/w1280/6PahEke329HOQx1QOqlo12e4YXa.jpg",
    crew: "Michael Crichton",
    year: 1993,
  },
  {
    id: 6,
    title: "Shrek",
    image:
      "https://www.themoviedb.org/t/p/w1280/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg",
    crew: "Andrew Adamson",
    year: 2001,
  },
  {
    id: 7,
    title: "Spider-Man",
    image:
      "https://www.themoviedb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    crew: "Sam Raimi",
    year: 2002,
  },
  {
    id: 8,
    title: "Spider-Man: No Way Home",
    image:
      "https://www.themoviedb.org/t/p/w1280/1Pb65hcIv4ymPBbH7ycRM2UUcga.jpg",
    crew: "Jon Watts",
    year: 2021,
  },
  {
    id: 9,
    title: "Shrek Forever",
    image:
      "https://www.themoviedb.org/t/p/w1280/mAn7hsIH0HgVVQOylvldl1HzySE.jpg",
    crew: "Mike Mitchell",
    year: 2010,
  },
  {
    id: 10,
    title: "The Shawshank Redemption",
    image:
      "https://www.themoviedb.org/t/p/w1280/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    crew: "Frank Darabont",
    year: 1994,
  },
  {
    id: 11,
    title: "Death Note",
    image:
      "https://www.themoviedb.org/t/p/w1280/vapuYy7yrYcML9bHuq5ct97hpSY.jpg",
    crew: "Shusuke Kaneko, Hideo Nakata, Shinsuke Sato",
    year: 2006,
  },
  {
    id: 12,
    title: "Game of Thrones",
    image:
      "https://www.themoviedb.org/t/p/w1280/rz4fSqurRILu7IcAKCIgUCYJouV.jpg",
    crew: "David Benioff, D. B. Weiss",
    year: 2011,
  },
  {
    id: 13,
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    image:
      "https://www.themoviedb.org/t/p/w1280/cekxVfkFg0T8KUUmJjhEkJmY09S.jpg",
    crew: "David Yates",
    year: 2022,
  },
  {
    id: 14,
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    image:
      "https://www.themoviedb.org/t/p/w1280/uqReraSvOaQXLkFp3TjqQQT2daf.jpg",
    crew: "Gore Verbinski",
    year: 2003,
  },
  {
    id: 15,
    title: "The Walking Dead",
    image:
      "https://www.themoviedb.org/t/p/w1280/rqeYMLryjcawh2JeRpCVUDXYM5b.jpg",
    crew: "Frank Darabont",
    year: 2010,
  },
];
let movies = [];
const modal = document.querySelector(".modal");
const movieList = document.querySelector(".modal--window__grid");
const closeModalButton = document.querySelector(".close-modal__icon");
const button = document.querySelector(".addMovie-btn");
const sortButtons = document.querySelectorAll(".sort-option");
const searchBar = document.querySelector("#search-bar");
const alert = document.querySelector(".alert-window");
const alertMessage = document.querySelector(".alert");
const alertIcon = document.querySelector(".alert--icon");
let cards;
let moviesID = [];
let currentOption = 0;

// --------------------------------------------------------------------------------------------
//                                    API CALL
// --------------------------------------------------------------------------------------------
const apiURL = `https://imdb-api.com/en/API/MostPopularMovies/k_4xvg9lv2`;
async function getMovies() {
  // const response = await fetch(apiURL);
  // const data = await response.json();
  // movies = data.items;
  if (movies.length == 0) movies = moviesOffline;
  displayMovies(movies);
}
// Checks if there are any movies stored in localStorage, if there are - prints them on the screen
if (localStorage.length > 0) {
  cards = [...getFromLS()];
  displayCards();
} else {
  cards = [];
}

// Adds movie to the screen and to localStorage after choosing from modal window
function addMovie(movie) {
  cards.push(
    new Card(
      movie.id,
      movie.title,
      `${movie.crew.split(" ")[0]} ${movie.crew.split(" ")[1]}`,
      movie.image,
      movie.year
    )
  );
  displayCards();
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
  let removeCardBtn = createBtn(outerDiv);
  let backCard = createBackCard(card);

  outerDiv.addEventListener("click", () => {
    outerDiv.classList.toggle("card-flip");
    removeCardBtn.classList.toggle("remove-btn__hidden");
    stopAnimation(frontCard);
  });

  outerDiv.appendChild(removeCardBtn);
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
  // Adds 3d rotation effect when hovered on the front side of the card
  frontCard.addEventListener("mousemove", (e) => {
    let mouseX = e.x;
    let mouseY = e.y;
    let rotateY = (centerX - mouseX) / ((position.right - position.left) / 2);
    let rotateX = (centerY - mouseY) / ((position.bottom - position.top) / 2);
    frontCard.style.setProperty("--rotateY", `${rotateY}`);
    frontCard.style.setProperty("--rotateX", `${-rotateX}`);

    if (Math.abs(rotateX) > Math.abs(rotateY)) {
      frontCard.style.setProperty("--angle", `${rotateX * 45}`);
    } else {
      frontCard.style.setProperty("--angle", `${rotateY * 45}`);
    }
    frontCard.style.setProperty("--shadowX", `${rotateY * 45}`);
    frontCard.style.setProperty("--shadowY", `${rotateX * 60}`);
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
    `
    <p class='card-back-p'>Name:<br><span class='card-back-span'>${card.name}</span></p>
      <p class='card-back-p'>Director:<br><span class='card-back-span'>${card.director}</span></p>
      <p class='card-back-p'>Year:<br><span class='card-back-span'>${card.year}</span></p>`
  );
  return backCard;
}
// Creates button to remove a card from library
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
  // Removes card from screen, arrays and localStorage after clicking
  removeCardBtn.addEventListener("click", () => {
    cards.forEach((card, index) => {
      if (div.dataset.id == card.id) {
        moviesID.splice(moviesID.indexOf(Number(div.dataset.id)), 1);
        div.remove();
        cards.splice(index, 1);
        updateLS();
      }
    });
  });
  return removeCardBtn;
}
// Adds sorting functions to buttons on the left side
sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let option = parseInt(button.dataset.option);
    sortAll(option);
    currentOption = option;

    sortButtons.forEach((btn) => {
      btn.classList.remove("sort-option__active");
      if (btn.dataset.option == currentOption)
        btn.classList.add("sort-option__active");
    });
  });
});
// Removes all cards from library
function clearLibrary() {
  let displayedCards = document.querySelectorAll(".card-wrapper");
  displayedCards.forEach((card) => {
    card.remove();
  });
  moviesID = [];
}
// Displays all cards in library and adds its id to array
function displayCards() {
  cards.forEach((card) => {
    if (!moviesID.includes(card.id)) {
      appendToSite(card);
      moviesID.push(card.id);
    }
  });
}
// Displays all available movies in modal window
function displayMovies(movies) {
  movies.forEach((movie) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");

    div.classList.add("card", "card--small", "card--small__visible");
    p.classList.add("card--small__title");
    img.src = movie.image;
    img.alt = movie.title;
    p.textContent = movie.title;

    div.appendChild(img);
    div.appendChild(p);
    div.addEventListener("click", () => {
      let message, icon;
      closeModal();

      // Checks if movie is already in library
      if (moviesID.includes(movie.id)) {
        message = "Error: Movie already in library";
        icon = "fa-times";
        displayAlert(message, icon, "red");
        return;
      }
      message = "Movie added successfully";
      icon = "fa-check";
      displayAlert(message, icon, "green");

      addMovie(movie);

      sortButtons.forEach((btn) => {
        if (btn.classList.contains("sort-option__active"))
          btn.classList.remove("sort-option__active");
      });
    });
    movieList.appendChild(div);
  });
}
getMovies();

// Allows to search for specific movie on list in modal window
searchBar.addEventListener("keyup", () => {
  const allSmallCards = document.querySelectorAll(".card--small");
  let input = normalizeString(searchBar.value);

  allSmallCards.forEach((card) => {
    let title = normalizeString(card.children[1].textContent).toLowerCase();
    if (!title.includes(input)) {
      if (card.classList.contains("card--small__visible"))
        card.classList.remove("card--small__visible");
    } else {
      if (!card.classList.contains("card--small__visible"))
        card.classList.add("card--small__visible");
    }
  });
});
// ----------------------------------------------------
//              Sorting functions
// ----------------------------------------------------
function sortAll(x) {
  switch (x) {
    case 1:
      sortAlphASC();
      break;
    case 2:
      sortAlphDESC();
      break;
    case 3:
      sortNewest();
      break;
    case 4:
      sortOldest();
      break;
  }
  clearLibrary();
  displayCards();
}
function sortAlphASC() {
  cards.sort((card1, card2) => {
    let name1, name2, k;
    name1 = card1.name.toLowerCase();
    name2 = card2.name.toLowerCase();
    let returnValue;
    name1 > name2 ? (returnValue = 1) : (returnValue = -1);
    return returnValue;
  });
}
function sortAlphDESC() {
  cards.sort((card1, card2) => {
    let name1, name2, k;
    name1 = card1.name.toLowerCase();
    name2 = card2.name.toLowerCase();
    let returnValue;
    name1 > name2 ? (returnValue = -1) : (returnValue = 1);
    return returnValue;
  });
}
function sortNewest() {
  cards.sort((card1, card2) => {
    return card2.year - card1.year;
  });
}
function sortOldest() {
  cards.sort((card1, card2) => {
    return card1.year - card2.year;
  });
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
function normalizeString(input) {
  return input
    .toString()
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'"-:*?<>{}]/g, "");
}

button.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

function displayAlert(message, icon, iconColor) {
  alert.style.transition = "none";
  alert.style.visibility = "visible";
  alert.style.opacity = 100;
  alertMessage.textContent = message;
  alertIcon.classList.add(icon);
  alertIcon.style.color = iconColor;

  setTimeout(() => {
    alert.style.transition = "visibility .5s, opacity .5s linear";
    alert.style.visibility = "hidden";
    alert.style.opacity = 0;
    alertIcon.classList.remove(icon);
  }, 3000);
}
