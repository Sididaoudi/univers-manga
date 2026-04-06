// affiche le détail d'un seul manga

/*

    Objectifs : récupérer l'id du manga via l'url

    Je veux mettre le titre du manga dans la balise h1

    Identifie l'élément technique inconnu (ex: "Comment modifier le texte d'un h1 en JS ?").

    Afficher dans la console le nom du manga et non pas l'ID

*/

// const urlParams = new URLSearchParams(window.location.search);

// const mangaId = urlParams.get("id");

// console.log(typeof mangaId);

// convertion de string vers number

// console.log(parseInt (mangaId)); // pas de changement je vois toujours "1"

// mangaData.find((title) => (title = "Naruto"));

// const found = mangaData.find((title) => title == "Naruto");

// console.log(mangaData);

// mon but afficher "Naruto"" au lieu de 1 dans la console

// const urlParams = new URLSearchParams(window.location.search);

// console.log(urlParams);

// const mangaId = urlParams.get("id");

// console.log(mangaId);

// console.log(parseInt("id")); // me donne NaN

// c'est impossible car c'est déjà un nombre 1

/*
    cette partie est déjà faite : 
    Attention, mangaId que tu récupères de l'URL est 
    souvent du Texte ("1"), alors que l'ID dans ton 
    tableau est peut-être un Nombre (1).

    Vue que j'ai 1 dans la console 

    Du coup le truc est d'afficher quand j'ai :

    http://127.0.0.1:5500/mangaDetails.html?id=1

    Naruto dans la console et non pas 1 

    Du coup c'est convertir number en string

    A moins que j'ai mal compris vue que je dois :
    
    Voir l'objet de Naruto en entier dans la console

    Je vais réessayer la méthode find et trouver "Naruto"
*/


// const found = mangaData.find((element) => element === "Naruto");

// console.log(found); // undefined

// URLSearchParam : permet de lire ce qu'il y a après le "?"
const urlParams = new URLSearchParams(window.location.search);

const mangaId = urlParams.get("id");

console.log(mangaId);

// convertir string en int

const mangaIdNum = parseInt(mangaId);

// console.log(mangaIdNum); // vrai nombre à utiliser


/* Donc je ne cherche pas "Naruto" mais l'objet dont l'ID

    est égal à l'ID de l'URL
*/

//   let filteredMangas = mangaData.filter(
//     (manga) =>
//       manga.title.toLowerCase().includes(searchWord) ||
//       manga.author.toLowerCase().includes(searchWord),
//   );

//   console.log(filteredMangas);

// let currentManga = mangaData.find((manga) => {

//     // je compare manga.id avec le manga actuel (celui de l'URL)
//     // if (manga.id == mangaIdNum) {
//     //     console.log("correct");
        
    
//     // }
//     // console.log(currentManga); // erreur

//     // console.log(mangaIdNum); // 1 puis incorrect
    
//     // afficher le log du résultat de .find

//     // console.log(find(currentManga));
    
//     // console.log(mangaId); // 1 donc c'est pas ça
    
//     // comment afficher l'objet complet dans la console ?

//        return currentManga;
// });

// console.log(currentManga); // undefined




// else {
//         console.log("incorrect"); // 46 incorrect logique
        
//     }

/* 
    Je créer une variable "current manga" qui prends 

    le tableau et j'applique la méthode find
    
    j'utilise "manga" comme élement

    puis je lui demande est-ce que manga.id (de mon fichier data)

    est égale à mangaIdNum (l'ID qui est dans l'URL)
*/
let currentManga = mangaData.find((manga) => manga.id == mangaIdNum);

if (currentManga != undefined) {
    let mangaImg = document.getElementById("details-img");

    mangaImg.src = currentManga.img;

    console.log(mangaImg);

    let ratingProduct = document.querySelector(".rating-badge");

    ratingProduct.textContent = currentManga.notation;

    let mangaTitle = document.getElementById("details-title");

    mangaTitle.textContent = currentManga.title;

    console.log(mangaTitle);

    let mangaSynopsis = document.getElementById("details-synopis");

    mangaSynopsis.textContent = currentManga.summary;

    console.log(mangaSynopsis);

    let originalTitleProduct = document.getElementById('details-original-title');

    originalTitleProduct.textContent = currentManga.originalTitle;

    let authorProduct = document.getElementById("details-author");

    authorProduct.textContent = currentManga.author;

    let editorProduct = document.getElementById("details-editor");

    editorProduct.textContent = currentManga.frenchEditor;

    let editorProductOriginal = document.getElementById("details-editor-original");

    editorProductOriginal.textContent = currentManga.originalEditor;

    let numberOfFrenchVolumes = document.getElementById("details-number-of-volumes-french");

    numberOfFrenchVolumes.textContent = currentManga.numbersOfVolumesFrance;

    let numbersOfVolumesJapan = document.getElementById("details-number-of-volumes-japan");

    numbersOfVolumesJapan.textContent = currentManga.numbersOfVolumesJapan;

    let typeProduct = document.getElementById("details-type");

    typeProduct.textContent = currentManga.type;

    let productBuyBtn = document.querySelector(".product-buy a");

    console.log(productBuyBtn);


    // Si currentManga.urlFnac existe 
    if (currentManga.urlFnac) {
      // J'injecte l'URL du manga dans le lien du bouton grâce à la propriété href
      productBuyBtn.href = currentManga.urlFnac;

      // ouvre un nouvel onglet
      productBuyBtn.target = "_blank";

      // Sinon je cache le bouton d'achat
    } else {
        productBuyBtn.style.display = "none";
    }
    

}
else {
    console.log("erreur");
    
}





/*** Afficher tous les mangas du même auteur ***/


let productList = document.querySelector(".product-content-list");

console.log(productList);


/*
    Je récupère le nom de l'auteur du manga actuel (la page du manga sur laquelle je suis)
    Je filtre uniquement par nom d'auteur

    Je veux afficher tous les mangas de l'auteur actuel


    1er étape : afficher le nom du mangaka du manga sur lequel je suis (la page sur laquelle je suis)

    je créer une variable currentMangaAuthor qui prends l'objet manga complet (liste de tous les mangas)

    puis j'applique la méthode filtre pour avoir uniquement les manga de l'auteur, je prends la propriété manga.autor (author dans le fichier data.js) 

    qui est égale à mangaAutorName (ça doit pas être ça)

    2ème étape : j'aurai probablement besoin d'un forEach et je vais créer

    des li à l'intérieur des ul   <ul class="product-content-list"></ul>


    Etape 1 : extraire le nom de l'auteur de la page sur laquelle je me trouve

    Etape 2 : utilisation du filtre avec deux conditions :
    
    "Est-ce que l'auteur est le même ?"

    ET "Est-ce que l'ID est différent de celui de ma page actuelle ?"

*/



// Etape 1 j'affiche l'auteur du manga de la page sur laquelle je me trouve

// let currentMangaAuthor = currentManga.author;

// console.log(currentMangaAuthor);


// Etape 2

// console.log(currentManga);

/*
 Si je comprends bien :

 currentManga = le manga actuel (la page sur laquelle je suis)

 currentMangaAuthor = nouvelle variable que j'ai crée 

 cette dernière prends currentManga.Author 

 currentManga me permet d'accéder aux propriété que je vois 

 dans le fichier Data.js donc par exemple autor

 Là j'ai réussi à afficher le nom de l'auteur du manga sur la page

 sur laquelle je me trouve 

 Je veux appliquer un filtre sur mangaData (donc tout l'objet
 
 manga, donc tout les manga issus de Data.js)

 Donc je lui dit "je créer une variable currentMangaAutor"

 = mangaData puis filtre ((manga) => manga.autor (comme si
 
 c'était currentManga.autor)) puis ..... 

 Donc il me faudrait à la fois l'extraction de l'auteur :

 let currentMangaAuthor = currentManga.author;

 Puis une nouvelle variable qui prendra mangaData.filter

*/

// je créer une nouvelle variable nomAuteurCible
// qui prends l'objet mangaData puis je filtre
// je mets un nom (m) je lui dit
// "compare moi la valeur de m.autor (je lui demande de comparer avec la propriété author) avec ma variable currentMangaAuthor"
// let nomAuteurCible = mangaData
//     .filter((m) => m.author === currentMangaAuthor,
// );




// console.log(nomAuteurCible);

// // maintenant je fais une boucle forEach sur ?

// // pour chaque a (donc auteur) tu me créer les li


// nomAuteurCible.forEach((a) => {
//   let li = document.createElement("li");

//   li.textContent = a;

//   // je mets les li dans l'ul
//     productList.appendChild(li);
// })

// OU alors je créer une fonction diplayMangaSameAuthor

function diplayMangaSameAuthor() {
  let currentMangaAuthor = currentManga.author;

  let nomAuteurCible = mangaData
    // exclure le manga actuel avec && : et Je veux que l'ID du manga examiné (m.id) soit différent de l'ID du manga de ma page actuelle
    .filter((m) => m.author === currentMangaAuthor && m.id != currentManga.id)
    .forEach((t) => {
    // je créer le li
        let li = document.createElement("li");

        // je mets les contenus que je veux afficher dans l'attribut li
        li.innerHTML = `
        
        <img src=${t.img} width="220px">
        `;

        productList.appendChild(li);

  });
};

diplayMangaSameAuthor();


