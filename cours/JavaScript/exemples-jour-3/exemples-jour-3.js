'use strict';
/**
 * JavaScript Objet et DOM - Jour 3
 */

/**
 * I. 2 Façon de construire des objets
 */

// I.1. Notation objet JavaScript, écriture littérale :
({});

var unObjet = {
  unePropriete: 'une valeur', // une propriété : une "variable" dans un objet
  uneMethode: function(){ // une méthode : une fonction assignée à une propriété d'un objet
    // Instructions
  }
};

// I.2. Fonctions constructeur
var MonConstructeur = function(){
  this.unePropriete = 'une valeur';
  this.uneMethode = function(){
    // Instructions
  };
}

// - S'utilise avec le mot-clé new :
var objet1 = new MonConstructeur();
var objet2 = new MonConstructeur();
var objet3 = new MonConstructeur();

/**
 * - On utilisera plutôt la notation objet littérale pour des objet utilitaires
 *   et les fonction constructeur pour créer des objets dont on a besoin en
 *   grand nombre.
 */

/**
 * I.3 Accéder aux propriétés des objets :
 * - 2 notations possibles
 */

objet2.unePropriete;
objet2['unePropriete'];
objet1['uneMethode']();

// - Soit l'utilisation du . (méthode préférée => plus courte)
// - Soit l'utilisation des [] (méthode utilisée pour les nom de propriétés qui contiennent des caractères spéciaux ou des nombres)

// I.4 Supprimer une propriété d'un objet :
// - Mot clé : delete
delete objet3.unePropriete; // supprime la propriété unePropriete de l'objet objet3

// I.5 Assigner une valeur à une propriété ou méthode d'un objet :
objet2.unePropriete = 42; // assigne la valeur 42 à la propriété unePropriete de objet2

// I.6 Créer une nouvelle propriété ou méthode dans un objet :
objet3.nouvellePropriete = true;
objet3.methodeSupplementaire = function(){
  // Instructions
};

/**
 * II.
 *
 * Notion de "prototypage" à l'aide d'un prototype
 * - Le prototype est un objet qui sert d'"ancêtre" à d'autres objets
 * - tous les "descendants" d'un prototype on accés au propriétés/méthodes du prototype
 *
 * 2 Façon de créer des objet qui ont un prototype
 */
// **************************************************************************
// II.1. Utilisation de l'objet fondamental Object et de sa méthode .create()
// - La méthode Object.create() permet de créer un objet à partir d'un autre objet

var descendant = Object.create(objet1);

// descendant est un objet qui n'a pas de propriétés propre (propriété qui lui sont directement attachées)
// mais il a accés aux propriétés et méthodes de son "ancêtre" (prototype).

descendant.unePropriete; // unePropriete est une propriété du prototype
descendant.uneMethode; // uneMethode est une propriété du prototype

// Exemple de chaine de prototype :
var lapinPrehistorique = {
  aUneFourrure: true,
  couleur: 'marron',
  cri: 'Gnaaaarl !',
  aDesDentsDeSabre: true,
  sePresente: function(){
    // this; pointe vers l'objet dans lequel la méthode est exécutée
    alert(this.cri);
  }
};

// Je créé un objet à partir d'un autre objet
var lapinContemporain = Object.create(lapinPrehistorique);
// Je déclare les propriété propre de ce nouvel objet
lapinContemporain.aDesDentsDeSabre = false;
lapinContemporain.cri = 'Squiiiik !';
// Je créé un objet à partir d'un autre objet
var lapinDuFutur = Object.create(lapinContemporain);
// Je déclare les propriété propre de ce nouvel objet
lapinDuFutur.couleur = 'Rose';
lapinDuFutur.cri = 'Je m\'appelle Jean-Marc';

/**
 * On peut également utiliser un "objet de définition de propriétés"
 * (voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
 * avec la méthode Object.create() pour créer un objet à partir d'un autre objet
 * et dans le même temps définir ses propriétés plutot que de créer le descendant
 * dans 1 premier temps et ensuite de définir ses propriétés.
 */

var lapinDeLEspace = Object.create(lapinDuFutur, {
  nom: {
    value: 'Karot',
    enumerable: true,
    writable: true,
    configurable: true
  },
  prenom: {
    value: 'Red',
    enumerable: true,
    writable: true,
    configurable: true
  },
  aUneCombinaisonSpatiale: {
    value: true,
    enumerable: true,
    writable: true,
    configurable: true
  }
});

lapinDeLEspace.nom; // 'Karot'
lapinDeLEspace.aUneFourrure; // true

// **************************************************************************
// II.2 Utilisation de la propriété .prototype d'une fonction utilisée comme
//      comme constructeur. Cette propriété contient le prototype qui sera
//      utilisé commee prototype des objets créés à l'aide de la fonction
//      constructeur

var FabricantDObjet = function(a, b, c) {
  this.couleur = a;
  this.longueur = b;
  this.largeur = c;
  this.matiere = 'Bois';
}

// On définit l'objet qui servira de prototype aux objets qu'on va créer avec
// la fonction constructeur FabricantDObjet :

FabricantDObjet.prototype; // cette propriété contient un objet {} vide par défaut
// On a le choix, soit on assigne 1 nouvel objet à la propriété, soit on ajoute
// des propriété dans l'objet vide qui sert de prototype par défaut.

FabricantDObjet.prototype = unObjet; // on assigne l'objet unObjet à la propriété prototype
// Désormais TOUT les objets qu'on VA créer à l'aide de FabricantDObjet auront pour
// prototype l'objet unObjet

var machin1 = new FabricantDObjet('rouge', 10, 25);

machin1.couleur; // 'rouge' : propriété propre
machin1.unePropriete; // 'une valeur': propriété issue du prototype

/**
 * III. Design patterns (patron de conception)
 */

// III.1. Fonction constructeur :

// En ES5 :
// - Mettre le propriétés propres (qui sont susceptibles de varier) dans les objets
// - Mettre les méthodes (qui à priori sont moins susceptible de varier) dans un prototype
// => Idée générale : utiliser le prototypage pour optimiser l'utilisation de la mémoire

var UnAutreConstructeurEnES5 = function(p){
  // Définition des propriété propres
  this.unePropriete = p;
  this.uneAutrePropriete = 'bidule';
  this.encoreUneAutrePropriete = 'machin';
}

// Dans le prototype on déclare des méthodes :

// SOIT
// On créé un objet qui servira de prototype
/**
 * var unObjetQuiContientLesMethodesEnES5 = {
  uneMethode: function(){
    //Instructions
  },
  uneAutreMethode: function(){
    // Encore des instructions
  }
};
**/

// On écrase le prototype par défaut {} par l'objet qu'on vient de créer
/**
UnAutreConstructeurEnES5.prototype = unObjetQuiContientLesMethodesEnES5;
**/

// SOIT
// On "enrichi" l'objet vide {} qui est par défaut dans le propriété .prototype
UnAutreConstructeurEnES5.prototype.uneMethode = function(){
  //Instructions
};
UnAutreConstructeurEnES5.prototype.uneAutreMethode = function(){
  // Encore des instructions
};


// Ensuite on utilise le constructeur pour créer des objets
var o1 = new UnAutreConstructeurEnES5('chouette');
var o2 = new UnAutreConstructeurEnES5('cool');
var o3 = new UnAutreConstructeurEnES5('génial');

o1.uneAutreMethode(); // uneAutreMethode est une méthode déclarée 1 seule fois et existant dans le prototype
o2.uneAutreMethode(); // uneAutreMethode est une méthode déclarée 1 seule fois et existant dans le prototype
o3.uneAutreMethode(); // uneAutreMethode est une méthode déclarée 1 seule fois et existant dans le prototype

// En ES6
// On peut créer une fonction constructeur à l'aide des mot-clé class et constructor
class UnAutreConstructeurEnES6 {
  constructor(p) {
    // Définition des propriétés propres
    this.unePropriete = p;
    this.uneAutrePropriete = 'bidule';
    this.encoreUneAutrePropriete = 'machin';
  }

  // Définition des méthodes du prototype
  uneMethode() {
    //Instructions
  }

  uneAutreMethode() {
    // Encore des instructions
  }
}

// Ensuite on utilise le constructeur pour créer des objets
var o1bis = new UnAutreConstructeurEnES6('chouette');
var o2bis = new UnAutreConstructeurEnES6('cool');
var o3bis = new UnAutreConstructeurEnES6('génial');

// III.2. Design pattern "sub-class" :

// En ES5
var JediEnES5 = function(obscur){
  // définition des propriétés propres d'un JediEnES5
  this.aLaForce = true;
  this.aUnSabreLaser = true;
  this.dureeEntrainement = '10 ans';
  this.estDuCoteObscur = obscur;
}

// définition d'une méthode du prototype de JediEnES5
JediEnES5.prototype.utiliseLaForce = function(){
  // Instructions
}

var HumainJediEnES5 = function(a, b, c, d){
  this; // pointe vers l'objet qui est créé par cette fonction constructeur au moment ou elle appellée
  // assignation des propriétés définies par JediEnES5 à l'objet qu'on créé
  JediEnES5.call(this, d); // méthode call des fonctions (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  // définition des propriétés propres d'un HumainJediEnES6
  this.nom = a;
  this.prenom = b;
  this.age = c;
}

// Ici on crée un objet à partir de l'objet qui sert de prototype à Jedi
HumainJediEnES5.prototype = Object.create(JediEnES5.prototype);
// On assigne cet objet à la propriété prototype de HumaineJedi


HumainJediEnES5.prototype.seCoupeLesCheveux = function(){
  // Autres Instructions
}

// Ici HumainJedi à une prototype QUI A LUI même un prototype qui est le prototype de Jedi

var personnage1 = new HumainJediEnES5('Luke', 'Skywalker', 21, false);
// personnage1 à pour propriété propre les propriétés déclarées
// dans la fonction constructeur HumainJedi et en plus (grâce à l'appel à .call)
// à pour propriété propre les propriétés déclarées dans la fonction
// constructeur Jedi.
var personnage2 = new HumainJediEnES5('Mace', 'Windu', 53, false);
var personnage3 = new HumainJediEnES5('Anakin', 'Skywalker', 42, true);

// En ES6
class JediEnES6 {
  constructor(obscur) {
    // définition des propriétés propres d'un JediEnES6
    this.aLaForce = true;
    this.aUnSabreLaser = true;
    this.dureeEntrainement = '10 ans';
    this.estDuCoteObscur = obscur;
  }

  // définition d'une méthode du prototype de JediEnES6
  utiliseLaForce() {
    // Instructions
  }
}

class HumainJediEnES6 extends JediEnES6 { // mot-clé extends remplace .call et l'assignation du prototype de JediEnES6
  constructor(a, b, c, d){
    // assignation des propriétés définies par JediEnES6 à l'objet qu'on créé
    super(d); // mot-clé super() remplace .call(this, d)
    // définition des propriétés propres d'un HumainJediEnES6
    this.nom = a;
    this.prenom = b;
    this.age = c;
  }

  seCoupeLesCheveux() {
    // Autres Instructions
  }
}

var personnage1bis = new HumainJediEnES6('Luke', 'Skywalker', 21, false);
var personnage2bis = new HumainJediEnES6('Mace', 'Windu', 53, false);
var personnage3bis = new HumainJediEnES6('Anakin', 'Skywalker', 42, true);


/**
 * IV. Objets fondamentaux - Partie 2
 */

// Exemple : Date
// Date : fonction constructeur fondamental
var heureActuelle = new Date();
heureActuelle; // contient des propriétés et des méthodes pour manipuler la date.
heureActuelle.getTime(); // renvoi le timestamp : temps écoulé en millisecondes depuis le 1er Janvier 1970
// soit négatif soit positif si la date est inférieur ou supérieur au 1er Janvier 1970.

// Fonction constructeur de "Coercition"
// - "Coercition":i.e. Forcer quelque chose

// Quand on écrit :
10; // est un type primitif
(10).toString(); // le moteur force 10 à devenir un objet à l'aide de la fonction constructeur fondamentale Number
// Est la même chose que d'écrire :
(new Number(10)).toString();
// Number est rarement utilisée par le développeur mais très utiliser par le moteur JavaScript

// Quand on écrit :
true; // est un type primitif
(true).toString(); // le moteur force true à dévenir un objet à l'aide de la fonction constructeur fondamentale Boolean
// Est la même chose que d'écrire :
(new Boolean(true)).toString();
// Boolean est rarement utilisée par le développeur mais très utiliser par le moteur JavaScript

// Quand on écrit :
"Bonjour à tous"; // est un type primitif
("Bonjour à tous").toUpperCase();  // le moteur force 'Bonjour à tous' à devenir un objet à l'aide de la fonction constructeur fondamentale String
// Est la même chose que d'écrire :
new String("Bonjour à tous").toUpperCase();
"Bonjour à tous"[5]; // Oblige "Bonjour à tous" à devenir un objet pour accéder à la propriété 5
// Est la même chose que d'écrire :
new String("Bonjour à tous")[5];

// DANS LES FAIT ON UTILISE RAREMENT DIRECTEMENT LES CONSTRUCTEUR DE COERCITION (en revanche on lit régulièrement la documentation les concernant)