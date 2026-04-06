/*** Recherche ***/

// loupe de recherche

let searchMagnifier = document.getElementById("search-magnifier");

console.log(searchMagnifier);

// balise search

let searchContainer = document.querySelector('.search-container');
console.log(searchContainer);

// gérer le clique pour afficher et cacher la balise search : possible grâce toggle

searchMagnifier.addEventListener('click', () => {

  searchContainer.classList.toggle('search-active');
});

// bouton pour fermer la barre de recherche

let searchCloseBtn = document.getElementById("search-close");

searchCloseBtn.addEventListener('click', () => {

  searchContainer.classList.remove("search-active");
})


// la recherche avec l'auto complete

let searchAuto = document.querySelector(".search-autocomplete");
console.log(searchAuto);


let search = document.getElementById("search");

console.log(search);

search.addEventListener('input', (e) => {
  // je récupère la saisie (valeur) de l'utilisateur et la stocke
  // dans une variable et je lui applique la méthode toLowerCase() qui retourne la
  // chaîne de caractères courante en minuscules.

  let li = document.createElement("li");

  let keyWord = e.target.value.toLowerCase();

  console.log(keyWord);

  // Je crée la variable filteredMangas qui va stocker le résultat de mon filtre.
  // Je parcours mon tableau mangaData, et pour chaque "manga" :
  // Je garde uniquement ceux dont le titre (en minuscules) OU l'auteur (en minuscules)
  // inclut le mot-clé (keyWord) tapé par l'utilisateur.
  let filteredMangas = mangaData.filter(
    (manga) =>
      manga.title.toLowerCase().includes(keyWord) ||
      manga.author.toLowerCase().includes(keyWord),
  );

  console.log(filteredMangas);

  // je vide la liste UL

  searchAuto.innerHTML = '';


  // Sinon parcours le tableau  filteredMangas et fait appel à la fonction

  // qui créer une carte à la fois

  // si la longueur du mots clé est à 0, arrêt de la fonction
  if (keyWord.length == 0) {
    searchAuto.style.opacity = "0"; // je cache searchAuto
    return; // arrêt de la fonction
  }
  // si le  manga ou mangaka n'existe pas j'affiche un message
  else if (filteredMangas.length == 0) {

    searchAuto.innerHTML = `
    
      Désolé aucun manga/mangaka ne correspond à votre recherche
    `;
  }
  else {
    filteredMangas.forEach((manga) => {
      // je créer une nouvelle variable qui prends l'appel de ma fonction
       let filtedCardManga = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

      searchAuto.appendChild(filtedCardManga);
    });

    searchAuto.style.opacity = "1";
  }



});


/*** ***/




function getMangaCard(manga, showNote, showTitle, showType, isSearchResult) {
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

  // je créé une "étiquette" personnalisée sur le li que j'appelle 'id'
  // cette dernière sert de clé pour savoir quel manga est affiché
  // dans cette carte
  li.dataset.id = manga.id;

  li.addEventListener("click", () => {
    // si je fais une recherche donc si c'est true
    // redirige vers la page du manga selon son ID
    if (isSearchResult) {
      window.location.href = `mangaDetails.html?id=${manga.id}`; // permet de diriger vers la page grâce à son ID
    }
  });

  return li;
}



/*

  Pour savoir sur quel manga je clique

  l'ID doit être "écrit" quelque part dans le 

  HTML de la carte

  1er étape : modifier la fonction getTopManga pour que 

  chaque li créé porte l'ID du manga (voir dataset)
*/

// fonction qui permet d'afficher tous les mangas

// je vais insérer dans la div "cards-product"

let cardProduct = document.querySelector(".card-product");
// console.log(cardProduct);


// mangaData
//   .sort(function (a, b) {
//     if (a.title < b.title) {
//       return -1;
//     }
//   })
// if (a.title > b.title) {
//   return 1;
// }
// return 0
//   .forEach((manga) => {
//     // boucle foreach, pour chaque manga
//     let cardElement = getTopManga(manga); // je créer la variable cardElement qui prends l'appel de la fonction getTopManga(manga)
//     cardProduct.appendChild(cardElement); // j'ajoute à la liste bestRatedList ma variable cardElement
//   });


mangaData
  .sort((function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  })) // Fin du sort
  .forEach((manga) => {
    // boucle foreach, pour chaque manga
    let cardElement = getMangaCard(manga);
    cardProduct.appendChild(cardElement); 
});

// fonction qui permet d'envoyer vers la page du manga
// // sur lequel l'utilisateur clique


/*
  Etape 1: récupérer le manga sur lequel

  l'utilisateur clique (se servir de l'ID du manga)

  Etape 2 : rediriger vers la page du manga  (toujours en 
  
  fonction de l'ID)

  j'ai besoin d'avoir les ID des mangas je suppose 


  Je parcours le tableau mangaData et 
  
  je prends uniqument les ID

  puis je récupère l'ID du manga 

*/



// function redirect() {
  
//   card
// }

// redirect();



// let titles = mangaData.title;
// console.log(titles);

cardProduct.addEventListener('click', (e) => {
  // Le li prends la valeur de l'element sur leque je clique
  // et la méthode closest permet de trouver la "racine"
  // à savoir connaitre le manga exact sur lequel j'ai cliqué

  // je récupère l'element li grâce à e.target.closest
  li = e.target.closest("li");

  console.log(li);
  

  // je stocke ce li dans ma variable mangaClicked

  let mangaClicked = li;

  // je lis son dataset

  console.log(mangaClicked); // j'affiche le manga sur lequel je clique

  // redirection

  /*

      window.location.href est une propriété qui permet de changer l'adresse

      de la page (comme un clic sur un lien)

      Je construit l'URL à l'aide de backticks pour mélanger texte et variable

      Je passe l'ID du manga dans l'URL après le "?" pour que la page mangaDetaisl

      puisse savoir quel manga charger

      J'utilise ma variable mangaClicked qui contient le li

      
  */

  window.location.href = `mangaDetails.html?id=${mangaClicked.dataset.id}`;

  

});

// mangaData.forEach((mangaID) => {

//   let selectedManga = mangaID.id;

//   console.log(selectedManga);
  
// });

// cardProduct.addEventListener('click', (e) => {

//   let mangaChosen = e.target.value;
//   console.log(mangaChosen);
  
// });

// .forEach((manga) => {
//     // boucle foreach, pour chaque manga
//     let cardElement = getTopManga(manga);
//     cardProduct.appendChild(cardElement);



/*******************************/

let mangaSelect = document.querySelectorAll(".select-filter a");

mangaSelect.forEach((link) => {

  link.addEventListener('click', (e) => {
    e.preventDefault(); // j'empêche la page de rechager

    // je récupére la catégorie du lien sur lequel je clique, ex : shonen

    let selectedCategorie = link.dataset.category;

    console.log(selectedCategorie);
    
    // boucle for qui permet de changer la couleur de fonds du bouton sur
    // lequel j'ai cliqué
    
    for (let i = 0; i <mangaSelect.length; i++){

      mangaSelect[i].classList.remove('active')

      console.log(e.target.value);
      
    }

    link.classList.add('active');

    console.log(selectedCategorie);
    


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
  });


});


// function selectManga() {
  
//   mangaSelect.addEventListener('click', (e) => {

//     console.log("test");
    

//     // e.preventDefault();

//   });
// }

// selectManga();



/*******************************/

/**** Search Input *****/

let searchMangaInput = document.querySelector(".search-input");
console.log(searchMangaInput);

searchMangaInput.addEventListener('input', (e) => {
  // récupère la saisie de l'utilisateur et la stocke dans une variable et je lui applique la méthode toLowerCase() qui retourne la chaîne de caractères courante en minuscules.
  let searchProduct = e.target.value.toLowerCase();

  console.log(searchProduct);

  // Variable temporaire 
  let mangaSearch;

  // filtre
  mangaSearch = mangaData.filter(
    (manga) => manga.title.toLowerCase().includes(searchProduct),
  );
  console.log(mangaSearch);
  

  // vide la liste des cartes actuelle

  cardProduct.innerHTML = "";

  // je créer les cartes uniquement pour les mangas issus de la recherche

  mangaSearch.forEach((manga) => {
    // je créer une nouvelle variable qui prends l'appel de ma fonction
    let results = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes

    cardProduct.appendChild(results);


    console.log(results);
    
  });

});


/*******************************/