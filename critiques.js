/*** Critiques ***/


// loupe de recherche

let searchMagnifier = document.getElementById("search-magnifier");

console.log(searchMagnifier);

// balise search

let searchContainer = document.querySelector('.search-container');
console.log(searchContainer);


//  let searchCloseBtn = document.getElementById("search-close");

//  searchCloseBtn.addEventListener("click", () => {
//    searchContainer.style.opacity = "0";
//    console.log(searchCloseBtn);
//  });



// quand je clique sur la loupe je fais apparaitre la balise search
// je lui injecte la classe ".search-active"

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





/***** Fin Seach bar ******/


// tableau de référence qui contiens les mois

// je créer une constante qui contient un tableau des mois
const monthNames = ["january", "february", "march", "april", "may","june", "july", "august", "september", "october", "november", "december"];

function getMangaCard(manga, showNote, showTitle, showType, isSearchResult) {
  // je créer le li et l'image
  let li = document.createElement("li");
  let img = document.createElement("img");

  // je "remplie" l'image
  img.src = manga.img;

  // je mets l'image dans le li
  li.appendChild(img);

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
    p.classList.add("genre");
    p.textContent = manga.type;

    li.appendChild(p);

    console.log("test");
  }

  /*
    J'utilise 'dataset' pour CRÉER une information personnalisée sur mon élément <li></li> donc là "id"

    Je stocke l'identifiant du manga (manga.id) directement dans le HTML

    Cela crée une "étiquette" appelée 'data-id' qui sert de clé

    Plus tard, je pourrai "lire" cette étiquette pour savoir quel manga a été cliqué
  */
  li.dataset.id = manga.id;

  li.addEventListener("click", () => {
    // si je fais une recherche donc si c'est true
    // redirige vers la page du manga selon son ID
    if (isSearchResult) {
      window.location.href = `mangaDetails.html?id=${manga.id}`; // permet de diriger vers la page grâce à son ID
    }
  });

  return li;
};




/*
    Au début les mangas sont affichés en fonction de la date

    de notation (de la plus récente à la plus ancienne) / Fait


    Ensuite je sélectionne les selects mois et années

    Puis le bouton filtrer


    A moins que, je dois faire comme dans le fichier 

    allmanga.js et faire let select

    Donc j'ai mis des ID sur months et years côté HTML 

    ensuite j'ai pointer mes deux variables et mon bouton filtrer

    Donc c'est sur le bouton "filtrer" que je veux mettre

    mon évènement au clique

*/
let cardProducts = document.querySelector(".card-product");

console.log(cardProducts);

let years = document.getElementById("years");
console.log(years);

let months = document.getElementById('months')
console.log(months);

let btnFilter = document.getElementById('filter');
console.log(btnFilter);

let btnReset = document.getElementById("reset");
console.log(btnReset);



/*
  Je parcours mon tableau mangaData (mon fichier data.js)

  J'applique la méthode "sort", je mets "a" et "b" comme paramètres, ils représente mon tableau mangaData

  je créer une première variable "firstDate" qui prends comme valeur le constructeur Date() (new Date qui permet 

  de créer un objet Date) en paramètre je lui dit "prends la propriété notationDate de a (donc de mon tableau mangaData) et
  
  converti ma propriété notationDate, par exemple notationDate: "2024-04-21", en objet Date donc Dimanche 21 Avril 2024 "

  puis je "retourne" secondDate - firstDate qui permet de trier plus récent au plus ancien

  Puis je parcours mon tableau avec forEach : pour chaque manga (paramètre qui représente mon tableau mangaData) je crée 

  une variable 'cardEleement à laquelle j'assigne l'appel de ma fonction getMangaCard

  Pour finir je "colle" à mon élément html <ul class="card-product"></ul> ma variable 'cardElement grâce à appendChild
*/
mangaData
  .sort((a, b) => {
    let firstDate = new Date(a.notationDate); // je convertis les dates en objets new Date()
    let secondDate = new Date(b.notationDate);
    return secondDate - firstDate; // je soustrais du plus récent au plus ancien
  }) // Fin du filtre
  .forEach((manga) => {
    // boucle foreach, pour chaque manga
    let cardElement = getMangaCard(manga, true, true); // je créer la variable cardElement qui prends l'appel de la fonction getMangaCard

    // let cardNotation = getMangaNote(manga);
    cardProducts.appendChild(cardElement); // j'ajoute à la liste cardProducts ma variable cardElement

});

btnFilter.addEventListener('click', (e) => {
  // je crée deux variables : selectedMonth et selectedYear

  // je crée une variable 'selectedMonth' qui stocke la 'valeur' de ma variable 'months' qui elle même pointe mon élément <select name="months" id="months">
  let selectedMonth = months.value;

  console.log(selectedMonth);

  // je crée une variable 'selectedYear' qui stocke la 'valeur' de ma variable 'years' qui elle même pointe mon élément <select name="years" id="years">
  let selectedYear = years.value;

  console.log(selectedYear);

  console.log(selectedMonth, selectedYear);

  /**
   * une fois que c'est fait je filtre mangaData
   *
   * et je vérifie si la date correspond à l'année sur
   *
   * laquelle j'ai cliqué et idem pour le mois
   *
   * donc je vais utiliser currentMonth et currentYear
   *
   * donc if (selectedMonth === currentMonth)
   *
   * et je dois également transformer la date en new Date avec
   *
   * getFullYear()
   *
   * je créée la variable mangaDate = le mois et l'année je choisie dans
   *
   * le select, cette variable je la transforme en new Date avec getFull()
   *
   *
   * notationDate = la date de la notation par exemple notationDate: "2025-05-03"
   *
   * mais c'est du texte actuellement, donc cette variable doit être
   *
   * converti en objet Date
   *
   * Pas besoin du if
   */

  /*
    J'ai mon tableau mangaData à qui j'applique la méthode 'filter'

    Je mets un nom 'manga' qui représente mon tableau mangaData

    Je crée une variable 'dateObj' qui va stocker la création d'une date 'new Date' avec en paramètre 'manga.notationDate' je demande à JS de 'regarder'

    la propriété 'notationDate' qui se trouve dans mon fichier data.js
  */
  mangaData
    .filter((manga) => {
      // je converi en objet Date ma propriété notationDate
      let dateObj = new Date(manga.notationDate);

      // je veux récupérer l'année et le mois de cet objet
      /*
        Je crée deux variables 'year' et 'month'  qui vont prendre comme valeur ma variable dateObj (qui est une date)
        
        puis j'utilise les méthodes .getFullYear() et .getMonth() qui permettent de retourner 

        l'année et le mois de la date renseignée d'après l'heure locale, en gros ça permet de passé  de 2024-04-21 à  2024 et Avril par exemple
      */
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth(); // donne un chiffre

      // console.log(year,month);

      // les mangas apparaissent uniquement SI
      // l'année du manga correspond à l'année sélectionnée
      // ET idem pour le mois

      // if (month === selectedMonth && year === selectedYear) {
      //   mangaDisplay = mangaData.filter(
      //     (manga) => manga.type.toLowerCase() === selectedMonth && selectedYear,
      //   );
      // }

      // je transforme en texte les mois, car actuellement
      // il m'affiche les mois en numéro

      // monthNames = dateObj.getMonth();

      // let months = monthNames.toString();
      // console.log("Hello" + months);

      // console.log(monthNames);

      // console.log("oui" + monthNames[0]);

      // je récupère le numéro du mois qui se trouve
      // dans mon tableau monthNames

      // je crée une nouvelle variable 'monthNumber' qui stocke ma variable 'dateObj' et j'utilise la méthode 'getMonth() qui permet de récupérer le mois
      // et MonthNumber affiche le numéro du mois, par exemple '4' pour Avril une fois après avoir sélectionner un mois dans le select
      let monthNumber = dateObj.getMonth();
      console.log(monthNumber);
      

      // console.log( manga.title + monthNumber);

      // je récuppère le nom en lettre du mois du manga que j'ai noté en dernier

      let mangaMonthName = monthNames[monthNumber];

      // console.log("Le mois" + " " + mangaMonthName);

      /***
       *
       * Il faut comparer SI le mois du manga
       *
       * grâce à ma variable mangaMonthName (qui me donne le nom du mois en lettre et non plus en chiffre)
       *
       *  elle est identique au mois que je sélectionne dans le menu déroulant
       *
       * Idem pour l'année
       */

      // Si le nom du mois du manga (qui existe dans notationDate) est égale à mois que j'ai sélectionné la liste
      // ET que l'année (idem notationDate)
      if (mangaMonthName == selectedMonth && year == selectedYear) {
        return true; // alors renvoie le ou les mangas
      } else {
        // sinon j'afffiche un message
        cardProducts.innerHTML = `

            <p class="error-message"> Désolé, aucun manga ne correspond la date choisie.</p>`;
      }
      cardProducts.innerHTML = "";
    }) // Fin du filtre

    .forEach((manga) => {
      // boucle foreach, pour chaque manga
      let cardElement = getMangaCard(manga, false, true); // je créer la variable cardElement qui prends l'appel de la fonction getTopManga(manga)
      cardProducts.appendChild(cardElement); // j'ajoute à la liste bestRatedList ma variable cardElement
    });
});


/* Reset */

// le bouton reset fonction uniquement SI j'ai cliqué sur filtre
// SINON il ne se passe rien

// ça réaffiche les mangas par défaut

/*
  evenement clique sur le bouton reset

  vide la liste ul

  colle un forEach (parcours le tableau) sur mangaData qui permet
  
  de "recréer" les cards
*/

btnReset.addEventListener("click", (e) => {
  // je vide la liste ul
  cardProducts.innerHTML = "";

  
 mangaData.forEach((manga) => {
   // boucle foreach, pour chaque manga
   let cardElement = getMangaCard(manga, false, true); // je créer la variable cardElement qui prends l'appel de la fonction getTopManga(manga)
   cardProducts.appendChild(cardElement); // j'ajoute à la liste bestRatedList ma variable cardElement
 }); 
});





/** Redirection  */

cardProducts.addEventListener("click", (e) => {


  // je récupère l'element li grâce à e.target.closest
  li = e.target.closest("li");

  console.log(li);

  // je stocke ce li dans ma variable mangaClicked

  let mangaClicked = li;

  // je lis son dataset

  console.log(mangaClicked); // j'affiche le manga sur lequel je clique

  window.location.href = `critiquesDetails.html?id=${mangaClicked.dataset.id}`;
});