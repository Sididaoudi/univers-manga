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

const monthNames = ["january", "february", "march", "april", "may","june", "july", "august", "september", "october", "november", "december"];

function getMangaCard(manga, showNote, showTitle, showType, isSearchResult) {
  // je créer le li, image et le h3 et le span
  let li = document.createElement("li");
  let img = document.createElement("img");
  // let title = document.createElement("h3");

  // je "remplie" l'image et le titre et le span
  img.src = manga.img;

  // je mets l'image et le titre dans le li
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




mangaData
  .sort((a, b) => {
    let firstDate = new Date(a.notationDate); // je convertis les dates en objets new Date()
    let secondDate = new Date(b.notationDate);
    return secondDate - firstDate; // je soustrais du plus récent au plus ancien
  }) // Fin du filtre
  .forEach((manga) => {
    // boucle foreach, pour chaque manga
    let cardElement = getMangaCard(manga, true, true); // je créer la variable cardElement qui prends l'appel de la fonction getTopManga(manga)

    // let cardNotation = getMangaNote(manga);
    cardProducts.appendChild(cardElement); // j'ajoute à la liste cardProducts ma variable cardElement

    // latestReviewsCards.appendChild(cardNotation);
});

btnFilter.addEventListener('click', (e) => {
  // je crée deux variables : selectedMonth et selectedYear

  let selectedMonth = months.value;

  console.log(selectedMonth);

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


  mangaData
      .filter((manga) => {
        // je converi en objet Date ma propriété notationDate
        let dateObj = new Date(manga.notationDate);

        // je veux récupérer l'année et le mois de cet objet
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

        let monthNumber = dateObj.getMonth();

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
          
        }
        else { // sinon j'afffiche un message
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