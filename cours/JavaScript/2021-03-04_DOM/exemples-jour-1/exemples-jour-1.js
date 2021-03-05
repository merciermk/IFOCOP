/**
 * JavaScript Objet et DOM - Jour 1
 */

/**
 * Types de données
 */

// String : Chaîne du caractères
'un texte'; // Encadrer une chaîne avec des guillemets simple (quotes)
"un autre texte"; // Encadrer une chaîne avec des guillemets double (double-quotes)
`encore un autre texte`; // Encadrer une chaîne avec des guillemets inversés (back-quote) (uniquement pour la navigateur récent qui prennent en charge ES6+)

// Number : Nombre
23;
0.5;
.5;
NaN; // Not a Number fait partie des nombres !
Infinity;

// Boolean : Booléén
true;
false;

// S'utilisent avec des opérateurs logiques
true && false;
true || false;
// S'obtiennent avec des opérateur logiques
54 < 12; // donne false
2 * 2; // 4
2 >= 6; // false
4 - 3; // 1
54 === 12; // false
54 == '54'; // true

// Et avec des structure conditionnelles ou des boucles
if ( true ) {
  // Est-ce que je viens ici ?
  // OUI !
}

if ( false ) {
  // Est-ce que je viens ici ?
  // NON !!!
}

// Entre les parenthése du if sont considérée comme falsy (équivalent false) les valeurs :
// undefined, null, '', 0 et NaN
// Tout le reste est considéré comme truthy (équivalent true)

// Function : fonction
// Déclaration avec le mot clé function
// Fonction qui attend 2 arguments
(function(arg1, arg2){
  // Ici des instructions
  // retourne une valeur (ici un String)
  return 'une valeur';
});

// Fonction anonyme assignée à une variable
var maVoiture = function(placeAvantDroite, placeAvantGauche){
  // placeAvantDroite contien(dra) 'Sami' lors de la première exécution
  // placeAvantGauche contien(dra) 'Marc' lors de la première exécution
  // Ici des instructions :
  return placeAvantGauche + ' conduit et ' + placeAvantDroite + ' a peur !';
}

maVoiture; // pointe vers l'endroit ou se trouve la fonction dans le mémoire.
// Exécution :
var boite = maVoiture('Sami', 'Marc'); // exécute la fonction dans sont emplacement mémoire

boite; // 'Marc conduit et Sami a peur !'

// Objets
// => une sous catégorie d'objet de type Array
{}; // Un objet vide en Notation Objet JavaScript littérale de type de base
[]; // Un objet vide en Notation Objet JavaScript littérale de type Array

// Objet sert à stocker des variables et leurs valeurs (String, Number, Boolean, Function OU Objet)
var quelquePartDansLaMemoire = {
  nomDeLaVariable: 'sa valeur',
  nomDuneAutreVariable: true,
  nomDEncoreUneAutreVariable: 235235,
  nomDEncoreEncoreUneVariable: function(){},
  nomEnfinDUneVariable: {
    nomDuneAutreVariable: 45
  },
  y: 'Hello'
};

quelquePartDansLaMemoire; // pointe sur l'emplacement de l'objet en mémoire

// Pointer sur une "variable" dans l'objet : pointer sur une PROPRIETE de l'objet
quelquePartDansLaMemoire.nomDEncoreUneAutreVariable; // 235235
quelquePartDansLaMemoire.nomEnfinDUneVariable.nomDuneAutreVariable; // 45

// Reference ciculaire
var personne = {
  prenom: 'Mike'
};

var chien = {
  nom: 'Medor',
  maitre: personne
};

// On peut ajouter à tout moment des propriétés dans un objet
personne.age = '35 ans';
personne.animalDeCompagnie = chien;
personne.estFatigue = true;

personne.animalDeCompagnie.nom; // pointe vers 'Médor'
chien.nom; // pointe vers 'Médor'
personne.animalDeCompagnie.maitre.animalDeCompagnie.nom; // pointe vers 'Médor'
chien.maitre.prenom; // pointe vers 'Mike'
chien.maitre.animalDeCompagnie.maitre.prenom; // 'Mike'

// Supprimer des propriété avec le mot clé delete
delete personne.estFatigue; // delete supprime la propriété d'un objet

// Une fonction à référencée à l'intérieur d'une propriété d'un objet s'appelle
// une METHODE (fonction dans une propriété d'un objet)

var autreChien = {
  nom: 'Rex', // une "variable" dans un objet : on appelle ça une PROPRIETE de l'objet
  aboit: function(bruit){ // une fonction dans une propriété : on appelle une METHODE de l'objet
    // On reçoit la valeur 'Wif !' dans bruit lors de la première exécution
    alert(bruit);
    return true;
  }
};
// On dit que les objets contiennent des PROPRIETE et des METHODES
// Exécuter une méthode d'un objet :
var valeurDeRetour = autreChien.aboit('Wif !'); // on transmet la valeur de bruit
valeurDeRetour; // contient true

// Mot-clé this (peut être utilisé uniquement dans 1 méthode !!!)
var autrePersonne = {
  prenom: 'Maxime',
  sePresente: function(poliment){
    // this; // pointe vers l'objet dans lequel s'éxécute la méthode
    // this; // pointe vers { prenom: 'Maxime', sePresente: function(){ ... } }
    // On a le droit d'utiliser this pour faire référence à l'objet
    // dans lequel la méthode s'éxécute à tout moment
    if (poliment) {
      alert("Bonjour je m'appelle " + this.prenom);
      this.jeMeSuisPresentePoliment = true;
    } else {
      alert("Yo !");
    }
  }
};

autrePersonne.sePresente(true); // exécute la méthode

var rono = {
  modele: 'twingo',
  reservoir: 50,
  roule: function(){ // Déclaration
    // modification de la valeur d'un propriété de l'objet dans
    // lequel la méthode est exécutée.
    this.reservoir = this.reservoir - 1;
  }
};

rono.reservoir; // 50
// Exécution à partir de l'objet qui est referencé dans la variable rono
rono.roule();
rono.reservoir; // 49

var surLeToit = rono.roule;
// Exécution à partir de l'espace mémoire global
surLeToit(); // à l'intérieur de la fonction this ne fait pas référence
// à l'objet qui est referencé dans la variable rono

// Accéder au propriété et aux méthodes : 2 syntaxes
var monArmoire = {
  etagereDuHaut: 'Des pulls',
  etagereDuMilieu: 'Des t-shirts',
  etagereDuBas: 'Des slips',
  'compartiment secret': 'Argent (beaucoup)',
  ouvrirLaPorte: function(){
    // des instructions ici...
  }
};

monArmoire.etagereDuMilieu; // pointe vers 'Des t-shirts'
// identique à
monArmoire['etagereDuMilieu']; // pointe vers 'Des t-shirts'
// monArmoire.compartiment secret // PLANTE !!! à cause de l'espace
// Seul solution :
monArmoire['compartiment secret']; // point vers 'Argent (beaucoup)'
// Exécuter la méthode :
monArmoire.ouvrirLaPorte();
// équivalent à :
monArmoire['ouvrirLaPorte']();

monArmoire.etagereDuBas = 'Des caleçons';
// ou alors (identique)
monArmoire['etagereDuBas'] = 'Des caleçons';

/**
 * Fabriquer des objets à la chaine ?
 * Les fonctions "constructeur"
 */
// Par convention, les fonction constructeur sont assignées
// à des variables dans le nom commence TOUJOURS par une Majuscule
// Ce sont les seules variables en JS qui commencent par des Majuscule
var ConstructeurDeMaison = function(nom){
  // Dans ce fonction j'utilise this PARCEQUE j'ai l'intention de l'utiliser avec new
  this.salon = 'Canapé';
  this.aUneSonnette = true;
  this.proprietaire = nom;
  this.sonne = function(){
    alert('Driiing');
  };
};

// Un fonction constructeur est impérativement utilisée avec le mot-clé new
// Mot-clé new permet de créer un nouvel objet à partir d'une fonction constructeur
// Quand on créé un nouvel objet on dit qu'on créé une INSTANCE de la fonction constructeur
// Création de 3 objet différents qui ont les même propriété/méthodes à l'intérieur

// ConstructeurDeMaison(); // ne fonctionne pas parceque la fonction conçue pour être utilisée avec new
var maison1 = new ConstructeurDeMaison('Sami');
var maison2 = new ConstructeurDeMaison('Amina');
var maison3 = new ConstructeurDeMaison('Maxime');
var maison4 = new ConstructeurDeMaison('Eddy');
var maison5 = new ConstructeurDeMaison('Mike');
var maison6 = new ConstructeurDeMaison('Adam');
var maison7 = new ConstructeurDeMaison('Toto');
var maison8 = new ConstructeurDeMaison('Titi');
var maison9 = new ConstructeurDeMaison('Tata');
var maison10 = new ConstructeurDeMaison('Tonton');

// Une fois les objets créés, ils utilisent comme
// les objets créés en notation littérale
maison7.proprietaire = 'La Banque';
maison9['proprietaire']; // 'Tata'