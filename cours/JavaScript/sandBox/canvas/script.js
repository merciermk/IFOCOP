'use strict';
/**
 * JavaScript Objet et DOM - Jour 4
*/

// Tous les objets du DOM sont construits à l'aide de fonctions constructeur

window; // objet construit à l'aide de la fonction constructeur Window
window.document; // objet construit à l'aide de la fonction constructeur HTMLDocument
window.document.body; // objet construit à l'aide de la fonction constructeur HTMLBodyElement
// ... etc.

// Toutes ces fonctions constructeur sont documentées sur le MDN et elle constitue l'API du DOM

/**
 * Les HTMLCollection : modifier plusieurs élèments du DOM les uns après les autres
 */
// La méthode querySelectorAll retourne une NodeList contenant l'ensemble
// des objets qui sont des Noeuds (Node) du DOM qui correspondent à des elements
// lu dans le source HTML qui on un selecteur CSS en particulier :
var listeDesLiDuDocument = window.document.querySelectorAll('li');

// ATTENTION listeDesLiDuDocument est une variable qui contient un
// objet de type NodeList avec ses propriété et méthodes. NodeList est un
// objet énumérable qui n'est pas construit comme les objet de type Array :
// ATTENTION => Pas les mêmes propriétés/méthodes
// ex : listeDesLiDuDocument.push n'existe pas !
// ex : listeDesLiDuDocument.length exist

// Pour boucler, on peut construire sa boucle de plusieurs façon :
// 1. Avec un compteur
for(var compteur = 0; compteur < listeDesLiDuDocument.length; compteur++) {
  console.dir(listeDesLiDuDocument[compteur]);
}
// 2. Avec les boucles pour parcourir les objets
for(var propriete in listeDesLiDuDocument) {
  // est-ce que la propriété issue de ce tour de boucle est une propriété propre de la liste
  if ( listeDesLiDuDocument.hasOwnProperty(propriete) ) {
    console.dir(listeDesLiDuDocument[propriete]);
  }
}
// 3. Utiliser une méthode du prototype de la liste si elle existe :
var fonctionAExecuterPourChaqueElementDeLaListe = function(unNoeudDeLaListe, indiceCorrespondant){
  console.dir(unNoeudDeLaListe);
}
// Ici la méthode forEach
listeDesLiDuDocument.forEach(fonctionAExecuterPourChaqueElementDeLaListe);

// LA FONCTION fournie au forEach SERA EXECUTEE à l'intérieur de forEach par
// le navigateur. Une fonction n'est PAS exécutée PAR le code du programmeur
// mais par un AUTRE système s'appelle un CALLBACK (une fonction de rappel).

// Un CALLBACK est une fonction déclarée par le programmeur mais n'est pas
// exécutée par le code du programmeur. Elle exécutée ailleurs par un autre
// code.

/**
var objet = {
  'hello world': 42,
  5: 'titi',
  pouet: 'toto',
  xyz: function(){},
  test: true
}

var unAutreObjet = Object.create(objet);
unAutreObjet.maProprieteAMoiToutSeul = "Ceci n'appartient qu'à moi";

for(var michelBlanc in unAutreObjet) {
  if (unAutreObjet.hasOwnProperty(michelBlanc)) {
    console.log('Nom de la propriété : ' + michelBlanc + ' ; valeur de la propriété : ' + unAutreObjet[michelBlanc]);
  }
}
*/

// EnES6+ uniquement :
// On a la possibilité d'utilise for... of
// ATTENTION fonctionne uniquement avec les navigateurs récents
// Permet de boucler sur les valeur des propriété propre d'un objet
for (var uneValeur of listeDesLiDuDocument) {
  console.dir(uneValeur);
}

/**
 * Modifier les propriété d'objets du DOM
 */
for(var autreCompteur = 0; autreCompteur < listeDesLiDuDocument.length; autreCompteur++) {
  console.dir(listeDesLiDuDocument[autreCompteur]);
  /*
  listeDesLiDuDocument[autreCompteur].style.color = 'red';
  listeDesLiDuDocument[autreCompteur].style['font-weight'] = 'bold';
  listeDesLiDuDocument[autreCompteur].style.borderBottom = '2px solid purple';
  */
  var styleAAppliquer = {
    'color': 'red',
    'font-weight': 'bold',
    borderBottom: '2px solid purple',
    'border-top': '1px solid pink'
  };
  for(var proprieteDeStyle in styleAAppliquer) {
    // on s'assure qu'on est bien sur une propriété propre de l'objet styleAAppliquer
    if (styleAAppliquer.hasOwnProperty(proprieteDeStyle)) {
      // On récupére la valeur associée au nom de propriété contenu dans proprieteDeStyle
      // Et on assigne cette valeur à la propriété de même nom dans le style de l'élèment
      // dont on veut modifier le style.
      listeDesLiDuDocument[autreCompteur].style[proprieteDeStyle] = styleAAppliquer[proprieteDeStyle];
    }
  }

}