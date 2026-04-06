// MODAL :


// console.log(bestRatedList);

// get the modal
// let modal = document.getElementById('myModal');
// // console.log(modal);

// let modalContent = document.querySelector(".modal-content");
// // console.log(modalContent);

// // get the span
// let modalSpan = document.querySelector(".close");

// // quand l'utilisateur clique sur la croix, ferme le modal
// modalSpan.addEventListener('click', () => {

//   modal.style.display = "none";
// });

// let modalImg = document.getElementById("modal-img");
// // console.log(modalImg);

// let modalTitle = document.getElementById("modal-title");
// // console.log(modalTitle);

// let modalText = document.getElementById("modal-text");


// else {
//        modal.style.display = "block";

//     // je "remplie" le modal
//     modalImg.src = manga.img;
//     modalTitle.textContent = manga.title;
//     modalText.textContent = manga.quickSummary;
//     }





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

// console.log(mangaData);
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

// window.addEventListener('click', (e) => {

//   if (e.target == modal) {
//     modal.style.display = "none";
//   }

// });



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

/*
  Manga dans la section critiques 

  Je vais afficher les 8 dernier mangas que j'ai noté 

  Donc les dates les plus récentes
*/

  /** Utilisation de if else soit :
   * 
   * rendre un lien cliquable quand je fais une recherche
   * 
   * ou alors ouvrir le modal
   * 
   *  **/


  // pour faire fonctionner le modal :
// j'ajoute un addEventlistener au li
  


 // je créée une variable temporaire
    let mangaDisplay;

    // de base tous les mangas selon leurs types sont affichés
    if (selectedCategorie === "all") {
      mangaDisplay = mangaData; // ici mangaDisplay contient la totalité du tableau
    } else {
      // sinon mangaDisplay stocke uniquement les mangas qui passent le test du filtre par type et qui contient la "catégorie" sur laquelle j'ai cliqué
      mangaDisplay = mangaData.filter(
        (manga) => manga.type.toLowerCase() === selectedCategorie,
      );
    }

    // je vide la liste ul
    cardProduct.innerHTML = "";

    mangaDisplay.forEach((manga) => {
      // je créer une nouvelle variable qui prends l'appel de ma fonction
      let filtedCardManga = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

      cardProduct.appendChild(filtedCardManga);

      console.log(filtedCardManga);
      console.log(mangaDisplay);
      
      
    });



let filteredMangas = mangaData.filter(
    (manga) =>
      manga.title.toLowerCase().includes(keyWord) ||
      manga.author.toLowerCase().includes(keyWord),
);
  

// je selectionne l'input search

// let searchInput = document.querySelector(".search-input");

// console.log(searchInput);


// // je lui mets un addEventListenner

// searchInput.addEventListener('input', (e) => {
//   // récupère la saisie de l'utilisateur et la stocke dans une variable et je lui applique la méthode toLowerCase() qui retourne la chaîne de caractères courante en minuscules.
//   let search = e.target.value.toLowerCase();

//   console.log(search);

//  // je créée une variable temporaire
//   let mangaDisplay;

//   // De base tous les mangas sont affichés
//   if (search.length == 0) {
//     mangaDisplay = mangaData; // ici mangaDisplay contient la totalité du tableau
//   } else {
//     // sinon mangaDisplay stocke uniqu ement le titre que j'ai écrit
//    mangaDisplay = mangaData.filter((manga) =>
//       manga.title.toLocaleLowerCase().includes(search),
//     );
//   }

//   // je vide la liste ul
//   cardProduct.innerHTML = "";


//   mangaDisplay.forEach((manga) => {
//     // je créer une nouvelle variable qui prends l'appel de ma fonction
//     let filtedCardManga = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

//     // j'affiche dans l'ul le resultat de ma recherche
//     cardProduct.appendChild(filtedCardManga);

    
//     });
// });





  /** Utilisation de if else soit :
   * 
   * rendre un lien cliquable quand je fais une recherche
   * 
   * ou alors ouvrir le modal
   * 
   *  **/


  // pour faire fonctionner le modal :
  // j'ajoute un addEventlistener au li

//   li.addEventListener("click", () => {
//     // si je fais une recherche donc si c'est true
//     // redirige vers la page du manga selon son ID
//     if (isSearchResult) {
//       window.location.href = `mangaDetails.html?id=${manga.id}`; // permet de diriger vers la page grâce à son ID
//       // sinon ouvre le modal
//     } else {
//        modal.style.display = "block";

//     // je "remplie" le modal
//     modalImg.src = manga.img;
//     modalTitle.textContent = manga.title;
//     modalText.textContent = manga.quickSummary;
//     }
   
//   });


// filter je veux uniquement les mangas de CET auteur la page du manga actuel
// let currentMangaAuthor = mangaData
//     .filter((manga) => manga.author == mangaAutorName);

// console.log(currentMangaAuthor);

// let mangaTitles = mangaData.filter((manga) => manga.title);

// console.log(mangaTitles);




// Je stocke dans currentMangaAutor l'objet manga complet dont l'auteur correspond à mangaAutorName.
// let currentMangaAutor = mangaData.filter((manga) => manga.author == mangaAutorName);

//  let filteredMangas = mangaData.filter(
//    (manga) =>
//      manga.title.toLowerCase().includes(mangaAutorName),
//  );

//  console.log(filteredMangas);

// let currentMangaAutor = mangaData.filter((manga) => {

//     manga.author == currentManga && mangaId
// })

// console.log(currentManga);

// let currentMangaAutor = currentManga.author;

// console.log(currentMangaAutor);


/***** Seach bar ******/



// console.log(search);

/*
 Pour rendre cliquable un manga quand je fais ma recherche
*/


// search.addEventListener('input', (e) => {
//   // récupère la saisie de l'utilisateur et la stocke dans une variable et je lui applique la méthode toLowerCase() qui retourne la chaîne de caractères courante en minuscules.
//   let search = e.target.value.toLowerCase();

//   console.log("hello" + search);

//   // je récupère la "boite" ul qui est en display none au début

//   let searchAuto = document.querySelector(".search-autocomplete");
//   console.log(searchAuto);

//   let resultSearch = mangaData.filter((manga) =>
//     manga.title.toLocaleLowerCase().includes(search),
//   );

//   // je vide la liste ul
//   searchAuto.innerHTML = "";

//   // si aucun manga (en gros si ça n'existe pas)

//   // Si le champ est vide, cela cache tout et arrête la fonction
//   if (search.length == 0) {
//     searchAuto.innerHTML = "";

//     return; // Arrêt de la fonction
//   } else {
//     resultSearch.forEach((manga) => {
//       // je créer une nouvelle variable qui prends l'appel de ma fonction
//       let resultSearch = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

//       searchAuto.appendChild(resultSearch);
//     });
//   }
// });


// let searchBar = document.getElementById("search-bar");
// console.log(searchBar);


// e = saisie de l'utilisateur

// const manga = mangaData;
// console.log(manga);


// searchBar.addEventListener("input", (e) => {
//   // récupère la saisie de l'utilisateur et la stocke dans une variable
//   let searchWord = e.target.value.toLowerCase();
  
  
//   let filteredMangas = mangaData.filter(
//     (manga) =>
//       manga.title.toLowerCase().includes(searchWord) ||
//       manga.author.toLowerCase().includes(searchWord),
//   );

//   console.log(filteredMangas);

//   // je vide la liste
//   bestRatedList.innerHTML = "";

  

//   // si aucun manga/auteur ne correspond à la saisie (en gros si ça n'existe pas)

//   if (filteredMangas.length == 0) {
//     bestRatedList.innerHTML = `

//     <p class="error-message"> Désolé, aucun manga ne correspond à votre recherche.</p>
    
//     `;
//   } else {

//     filteredMangas.forEach((manga) => {
//       // je créer une nouvelle variable qui prends l'appel de ma fonction
//       let filtedCardManga = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

//       bestRatedList.appendChild(filtedCardManga);

//     });
//   }
//   ;
// });

// let searchMagnifier = document.getElementById("search-magnifier");

// console.log(searchMagnifier);

// let searchContainer = document.querySelector(".search-container");
// console.log(searchContainer);


// searchMagnifier.addEventListener("click", () => {
//   searchContainer.classList.add("active");

//   console.log("test");
  
// });
