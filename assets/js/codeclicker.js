var ligne_code = 0;
var delai_base = 100;

var textscore = document.getElementById('score');
var clic = document.getElementById('clic');

var clicOpti = document.getElementById('clic-opti');
var prix_clicOpti = document.getElementById('prix__clic-opti');
var clicScore = document.getElementById('clic-score');

var singes = document.getElementById('singes');
var prix_singes = document.getElementById('prix__singes');
var nbrSinges = document.getElementById('nbr__singes');


    function ajoutClic () {
        ajout = parseFloat(clicScore.innerHTML);
        ligne_code += ajout;
        textscore.innerHTML = ligne_code;
    }

    clic.addEventListener('click', ajoutClic, false);
    
    clicOpti.addEventListener('click', function() {
        prix = parseFloat(prix_clicOpti.innerHTML);
        if (ligne_code >= prix) {
            ligne_code -= prix;
            textscore.innerHTML = ligne_code;
            clicScore.innerHTML++;
            prix *= 1.5;
            prix_clicOpti.innerHTML= prix;
        }
        }, false);
        
    singes.addEventListener('click', function() {
        prix = parseFloat(prix_singes.innerHTML);
        nbSinge = parseFloat(nbrSinges.innerHTML);
        if (ligne_code >= prix) {
            ligne_code -= prix;
            textscore.innerHTML = ligne_code;
            nbSinge = nbSinge + 0.1;
            nbrSinges.innerHTML = nbSinge;
            prix *= 1.5;
            prix_singes.innerHTML= prix;
            delai = delai_base / nbSinge;
            
            intervalID = window.setInterval(ajoutClic,delai);
        }
        }, false);
        
        
    