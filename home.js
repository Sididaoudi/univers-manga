/***** Seach bar ******/

let searchBar = document.getElementById("searchBar");
console.log(searchBar);

// e = saisie de l'utilisateur

// const manga = mangaData;
// console.log(manga);

searchBar.addEventListener("input", (e) => {
  // récupère la saisie de l'utilisateur et la stocke dans une variable
  let searchWord = e.target.value.toLowerCase();

  let filteredMangas = mangaData.filter(
    (manga) =>
      manga.title.toLowerCase().includes(searchWord) ||
      manga.author.toLowerCase().includes(searchWord),
  );

  console.log(filteredMangas);

  // je vide la liste
  bestRatedList.innerHTML = "";

  // si aucun manga/auteur ne correspond à la saisie (en gros si ça n'existe pas)

  if (filteredMangas.length == 0) {
    bestRatedList.innerHTML = `

    <p class="error-message"> Désolé, aucun manga ne correspond à votre recherche.</p>
    
    `;
  } else {
    filteredMangas.forEach((manga) => {
      // je créer une nouvelle variable qui prends l'appel de ma fonction
      let filtedCardManga = getTopManga(manga); //qui permet de recréer les cartes

      bestRatedList.appendChild(filtedCardManga);
    });
  }
});

/***** Fin Seach bar ******/

// fonction qui permet de récupérer les mangas dans la section "top mangas" et le modal

let bestRatedList = document.querySelector(".scroll-row");
// console.log(bestRatedList);

// get the modal
let modal = document.getElementById("myModal");
// console.log(modal);

let modalContent = document.querySelector(".modal-content");
// console.log(modalContent);

// get the span
let modalSpan = document.querySelector(".close");

// quand l'utilisateur clique sur la croix, ferme le modal
modalSpan.addEventListener("click", () => {
  modal.style.display = "none";
});

let modalImg = document.getElementById("modal-img");
// console.log(modalImg);

let modalTitle = document.getElementById("modal-title");
// console.log(modalTitle);

let modalText = document.getElementById("modal-text");

function getTopManga(manga) {
  // je créer le li, image et le h3
  let li = document.createElement("li");
  let img = document.createElement("img");
  let title = document.createElement("h3");

  // je "remplie" l'image et le titre
  img.src = manga.img;
  title.textContent = manga.title;

  // je mets l'image et le titre dans le li
  li.appendChild(img);
  li.appendChild(title);

  // pour faire fonctionner le modal :
  // j'ajoute un addEventlistener au li

  li.addEventListener("click", () => {
    modal.style.display = "block";

    // je "remplie" le modal
    modalImg.src = manga.img;
    modalTitle.textContent = manga.title;
    modalText.textContent = manga.quickSummary;
  });

  return li;
}

/*
  Objectifs : 
  
  appeler mon fichier data.js 

  créer une condition : afficher les mangas

  dont la note est supérieur à 9.3

  
*/

//
// je parcours le tableau[manga]
// et j'affiche les mangas dont la note est
// supérieur à 9.3
// et je limite le nombre de mangas afficher à 8

// mangaData.forEach(manga => {

//    if (manga.notation >= 9.3) {
//      let cardElement = getTopManga(manga);

//      bestRatedList.appendChild(cardElement);
//    }

// });

//   mangaData.map(function (manga) {

// mangaData.filter(manga.notation >= 9.3).slice(7).forEach((manga) => {

//   let cardElement = getTopManga(manga);

//    bestRatedList.appendChild(cardElement);
// });

// mangaData.filter((manga) => {
//   manga.notation >= 9.3;
// });

mangaData
  .filter((manga) => {
    return manga.notation >= 9.3; // filtre les mangas qui ont une note de 9.3 affiche uniquement ces mangas
  }) // Fin du filtre
  .slice(1, 9) // je coupe en gardant 8 mangas
  .forEach((manga) => {
    // boucle foreach, pour chaque manga
    let cardElement = getTopManga(manga); // je créer la variable cardElement qui prends l'appel de la fonction getTopManga(manga)
    bestRatedList.appendChild(cardElement); // j'ajoute à la liste bestRatedList ma variable cardElement
  });

// Appel de l'API Jikan

// async function getBestRatedMangaData() {

//   const url = "https://api.jikan.moe/v4/top/manga?limit=9";

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Reponse status : ${response.status}`);
//     }

//     const data = await response.json();

//     let mangas = data.data;

//     mangas.map(function (manga) {

//     // Je stocke l'élément DOM (le li) retourné par ma fonction factory
//     let cardElement = getTopManga(manga);

//       bestRatedList.appendChild(cardElement);

//     })

//   } catch (error) {
//     console.log(error.message);
//   }
// }

// getBestRatedMangaData();

// fetch fichier data.js

console.log(mangaData);

// slides show

// je pointe mes deux flèches

let prevArrow = document.querySelector(".prev");
// console.log(prevArrow);

let nextArrow = document.querySelector(".next");
// console.log(nextArrow);

78;
// je pointe mon conteneur

let slidesContainer = document.querySelector(".scroll-row");
// console.log(slidesContainer);

// je créer un addEventListener sur ma flèche droite

nextArrow.addEventListener("click", () => {
  slidesContainer.scrollLeft = slidesContainer.scrollLeft += 300;
});

// idem pour la flèche de gauche

prevArrow.addEventListener("click", () => {
  slidesContainer.scrollLeft = slidesContainer.scrollLeft -= 300;
});

// modal quand je clique sur une card

// get the modal
// let modal = document.getElementById('myModal');

// console.log(modal);

// get the button that opens the modal

// let modalBtn = document.getElementById('myBtn');

// console.log(modalBtn);

// get the span element that closes the modal

// let modalSpan = document.querySelector('.close');
// console.log(modalSpan);

// // quand l'utilisateur clique sur le bouton "ouvrir", ouvre le modal

// modalBtn.addEventListener('click', () => {

//   modal.style.display = "block";
//   // console.log("test");

// });

// quand l'utilisateur clique sur la croix, ferme le modal

// modalSpan.addEventListener('click', () => {

//   modal.style.display = "none";
// });

// quand l'utilisateur clique en dehors du modal, ferme le modal

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

/*
  Pour mon code :

  Notes :

  De ce que je comprends du modal, donc il est déjà présent

  mais il est en display none

  Donc je vais créer une nouvelle Div 

  avec l'image du manga en grand

  un résumé court 

  et un bouton lire (un lien)

  un border radius

  Et une croix pour fermer le modal

  Donc cette div va être en dehors du ul 
  
  car : Le modal doit être indépendant du carousel

  Le modal doit se superposer à toute la page

  Le modal doit être positionné en fixed ou absolute par rapport au viewport


  et elle sera devant les autres cards en petit 

  et ce sera une seule image en grand à la fois

  Etape 1 :
  
  J'ai pas de besoin de bouton "ouvrir le modal"

  donc pas besoin de : <button id="myBtn">Open modal</button>


  car je vais ouvrir le modal quand je clique sur la card

  ********************************************************

  Etape 2 : 

  Si j'ai bien compris il me faut une nouvelle Div 

  qui vas être en display none et qui va contenir l'image en plus

  grand ou alors je n'ai pas besoin de nouvelle Div

  Dans ce cas je pointe la card et j'applique du css 

  genre : width: 100%; height: 100%; sur l'image ? 


  ********************************************************
 
  Etape 3 : il me faut une croix pour fermer le modal

  je vais appliquer un addEventListner au clique sur la croix

  comme ceci : modalSpan.addEventListener('click', () => {

  modal.style.display = "none";
});


*/

// je pointe ma variable myModal

// dans ce modal je fais appel à la fonction avec l'APi
// afin de récupérer les cards

// donc je lui injecte un appenchild ?

// quand je clique sur le modal
// je le remplis avec une card
//Le modal doit rester vide tant qu’on n’a rien cliqué
//  Le modal doit afficher un seul manga à la fois

// je génères mes cards dans la row

/*
La row = <ul class="scroll-row">

Le modal = <div id="myModal">

Tu génères les cards dans la row, pas dans le modal

Le modal ne doit contenir qu’un seul contenu à la fois

Tu remplis le modal au clic, pas dans la boucle map()
*/

/*
  Le addventlistener doit être sur chaque card 

  donc chaque li 

  car 
  
  C’est la card que l’utilisateur clique

C’est la card qui contient les infos du manga

C’est la card qui doit déclencher l’ouverture du modal

*/


