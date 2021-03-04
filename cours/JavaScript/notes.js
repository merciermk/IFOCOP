this = 

Fonction constructeur exemple : 

var ConstructeurDeMaison = function(){
    // Dans ce fonction j'utilise this PARCEQUE j'ai l'intention de l'utiliser avec new
    this.salon = 'Canapé';
    this.aUneSonnette = true;
    this.sonne = function(){
      alert('Driiing');
    };
  }

 s'utilise avec NEW :

 var maFonction = new ConstructeurDeMaison();

 // Permet de recuperer l'objet dans une variable. 
 // fonction constructeur a une majuscule a la premiere lettre. 

 