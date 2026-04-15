// loupe de recherche

let searchMagnifier = document.getElementById("search-magnifier");

console.log(searchMagnifier);

// la balise search 

let searchContainer = document.querySelector('.search-container');
console.log(searchContainer);


// quand je clique sur la loupe je lui mets un event au clique
// je lui injecte la classe ".search-active" via toggle (permet de basculer d'un état à un autre)

// gérer le clique pour afficher et cacher la balise search : possible grâce toggle

searchMagnifier.addEventListener('click', () => {

  searchContainer.classList.toggle('search-active');
});

// bouton pour fermer la barre de recherche

let searchCloseBtn = document.getElementById("search-close");

searchCloseBtn.addEventListener('click', () => {

  searchContainer.classList.remove("search-active");
})


// la recherche avec l'auto complete (liste ul)

// mon input de type search
let search = document.getElementById("search");

console.log(search);

// mon ul search auto (ma liste UL)
let searchAuto = document.querySelector(".search-autocomplete");
console.log(searchAuto);

// a mon input search je mets un event (input quand j'écris quelque chose)
search.addEventListener('input', (e) => {
  // je créer une variable qui va permettre de récupèrer la saisie (valeur) de l'utilisateur et de la stocker
  // et je lui applique la méthode toLowerCase() qui retourne la chaîne de caractères courante en minuscules. (peu importe si j'écris en majuscule ou minuscule ça fonctionne)
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

  // ensuite je vide la liste (ul)
  searchAuto.innerHTML = '';


  // Sinon parcours le tableau  filteredMangas et fait appel à la fonction

  // qui créer une carte à la fois

  // si la longueur du mots clé est à 0, arrêt de la fonction
  if (keyWord.length == 0) {
    searchAuto.style.opacity = "0"; // je cache searchAuto
    return; // arrêt de la fonction
  }
  // sinon si (la longueur du résultat de ma recherche est égale à 0) signifie également que si le manga ou le mangaka n'existe pas j'affiche un message
  else if (filteredMangas.length == 0) {
    searchAuto.innerHTML = `
    
      Désolé : ${keyWord} n'existe pas
    `;
  }
  // sinon je parcours le tableau des résultats filtrés avec ForEach
  // pour chaque manga tu insère ma fonction getMangaCard dans ma nouvelle variable filtedCardManga
  else {
    filteredMangas.forEach((manga) => {
      // je créer une nouvelle variable qui prends l'appel de ma fonction
      let filtedCardManga = getMangaCard(manga, false, false, false, true); //qui permet de recréer les cartes (une par une)

      searchAuto.appendChild(filtedCardManga); // puis je "colle" ma variable filtedCardManga à la liste ul 
    });

    searchAuto.style.opacity = "1";
  }


});


/***** Fin Seach bar ******/



/***** Menu burger ******/

let navLinks = document.querySelector(".nav-links");

console.log(navLinks);


// let burgerMenuBars = document.getElementById("bars");

// bars.addEventListener('click', () => {

//   navLinks.classList.toggle("menu-open");

  
// });

let logoImg = document.getElementById("logo");
console.log(logoImg);


let spanBars = document.getElementById("span-bars");

console.log(spanBars);

spanBars.addEventListener('click', () => {

  
  navLinks.classList.toggle("menu-open");

  logoImg.classList.toggle("show-logo");

  spanBars.classList.toggle('open');
})


/***** Fin Menu burger ******/



/***** Sections les mieux notés ******/

let bestRatedList = document.querySelector(".scroll-row");


// fonction qui permet de créer une card pour les mangas dans les sections "top mangas", "dernières critiques" et le modal
// permet également de rendre un lien cliquable dans la barre de recherche 

function getMangaCard(manga, showNote, showTitle, showType, isSearchResult) {
  // je créer le li, image et le h3 le span et le bouton 
  let li = document.createElement("li");
  let img = document.createElement("img");
  let btnMore = document.createElement("button");

  // je "remplie" l'image 
  img.src = manga.img;

  // je "colle" l'image et le bouton dans le li
  li.appendChild(img);
  li.appendChild(btnMore);

  if (showNote) {
    let span = document.createElement("span");
    span.textContent = manga.notation;
    span.classList.add("note");

    li.appendChild(span);
  }

  if (showTitle) {
    let title = document.createElement("h3");
    title.textContent = manga.title;
    li.appendChild(title);
  }

  if (showType) {
    let p = document.createElement("p");
    p.textContent = manga.type;
    p.classList.add("genre");
    li.appendChild(p);

    
  }


  btnMore.textContent = `En savoir plus`;

  btnMore.classList.add("more-btn");

  // Redirection gâce au bouton
  btnMore.addEventListener('click', () => {
    window.location.href = `mangaDetails.html?id=${manga.id}`;
    
  })

  li.addEventListener("click", () => {
    // si je fais une recherche donc si c'est true
    // redirige vers la page du manga selon son ID
    if (isSearchResult) {
      window.location.href = `mangaDetails.html?id=${manga.id}`; // permet de diriger vers la page grâce à son ID
    } 
   
  });

  li.appendChild(btnMore);


  return li;
};


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

/*
  ici mangaData c'est mon tableau qui provient de mon fichier data.js

  j'applique la méthode filter, je mets un nom "manga"
  
  je lui dit de retourner les mangas dont la note est supérieur ou égale à 9.3 

  dans manga je prends la propriété "notation"

  boucle forEach: pour chaque manga je créer une variable cardElement qui prends la valeur, l'appel de ma fonction getMangaCard (qui elle même permet de créer une carte à la fois)

  et dans la paramètre, j'affiche le manga, je cache la note et j'affiche le titre

  ensuite j'ajoute à la liste bestRatedList ma variable cardElement via appendChild
*/
mangaData
  .filter(manga => {
    return manga.notation >= 9.3 // filtre les mangas qui ont une note de 9.3 affiche uniquement ces mangas
  }) // Fin du filtre
  .slice(0, 8) // je coupe en gardant 8 mangas
  .forEach(manga => {
    // boucle foreach, pour chaque manga
    let cardElement = getMangaCard(manga, false, true); // je créer la variable cardElement qui prends l'appel de la fonction getMangaCard(manga)
    bestRatedList.appendChild(cardElement); // j'ajoute à la liste bestRatedList ma variable cardElement
  });


// les lides

// je pointe mes deux flèches

let prevArrow = document.querySelector(".prev");
// console.log(prevArrow);

let nextArrow = document.querySelector(".next");
// console.log(nextArrow);

let slidesContainer = document.querySelector(".scroll-row");
// console.log(slidesContainer);

// je créer un addEventListener sur ma flèche droite

nextArrow.addEventListener('click', () => {
  // j'applique l'element CSS "scrollLeft" qui prends la valeur de 300 qui permet d'aller à droite
  slidesContainer.scrollLeft = slidesContainer.scrollLeft += 300;
});

// idem pour la flèche de gauche

prevArrow.addEventListener("click", () => {
  // j'applique l'element CSS "scrollLeft" qui prends la valeur de -300 qui permet d'aller à gauche
  slidesContainer.scrollLeft = slidesContainer.scrollLeft -= 300;
});


// section les manga que j'ai noté en dernier (en fonction de la date)
let latestReviewsCards = document.querySelector(".latest-reviews-list-cards");
// console.log(latestReviewsCards);

// function getMangaNote(manga) {
//   // je créé le span
//   let span = document.createElement("span");

//   // je "remplie" le span
//   span.textContent = manga.notation;

//   // je mets le span dans le li
//   li.appendChild(span);
// }

mangaData
  .sort((a, b) => { // permet de trier du plus récent au plus ancien d'où le a,b et pas l'inverse
    let firstDate = new Date(a.notationDate); // je convertis mes variables en objets new Date() donc en date
    let secondDate = new Date(b.notationDate);
    return secondDate - firstDate // je soustrais du plus récent au plus ancien, la seconde date moins la première date 
  }) // Fin du filtre
  .slice(0, 8) // je coupe en gardant 8 mangas
  .forEach((manga) => {
    // boucle foreach, pour chaque manga
    let cardElement = getMangaCard(manga, true, true); // je créer la variable cardElement qui prends l'appel de la fonction getMangaCard, j'affiche la notation et le titre

    latestReviewsCards.appendChild(cardElement); // j'ajoute à mon element html latestReviewsCards ma nouvelle variable cardElement qui contient l'appel de ma fonction
  });


// fonction qui affiche les manga que je recommande à lire en fonction des genres, un manga pour illustrer un genre

let mangaReco = [1, 53, 24, 51, 10, 49]; // tableau qui contient les mangas que je veux afficher par genres (un manga pour un genre)

let genresList = document.querySelector(".genres-list-cards");
// console.log(genresList);


// console.log(typeof mangaReco[0]);

// je parcours mon tableau mangaData[] avec includes pour vérifier si les ID que je veux existe

mangaData.filter((manga) => {

  // console.log(typeof manga);
  
  // je vérifie si dans mangaReco les ID inclus (ceux que j'ai mis) existe bien 
  // dans mon tableau mangaData (grâce à l'ID)
  // je lui dit "est-ce que les nombres (1,53,24 etc...) de mon tableau mangaReco sont inclus dans mon tableau mangaData (mon fichier Data.js) "
  return mangaReco.includes(manga.id);
})
  .forEach((manga) => {
    let cardElement = getMangaCard(manga, false, false, true); // je créer la variable cardElement qui prends l'appel de la fonction getMangaCard

    genresList.appendChild(cardElement);
  })


