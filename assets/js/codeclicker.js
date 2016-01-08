var ligne_code = 0;

var textscore = document.getElementById('score');
var clic = document.getElementById('clic');

var clicOpti = document.getElementById('clic-opti');
var prix_clicOpti = document.getElementById('prix__clic-opti');
var clicScore = document.getElementById('clic-score');


    clic.addEventListener('click', function() {
        ajout = parseFloat(clicScore.innerHTML);
        ligne_code += ajout;
        textscore.innerHTML = ligne_code;
        }, false);
    
    clicOpti.addEventListener('click', function() {
        prix = parseFloat(prix_clicOpti.innerHTML);
        if (ligne_code > prix) {
            ligne_code -= prix;
            textscore.innerHTML = ligne_code;
            clicScore.innerHTML++;
            prix *= 1.5;
            prix_clicOpti.innerHTML= prix;
        }
        }, false);