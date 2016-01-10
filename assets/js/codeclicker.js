var delai_base = 1000; //délais de base des autoclick

var lance = false; //variable utilisée pour la gestion de vérification d'achat d'item

var ligne_code = document.getElementById('score'); //nombre de lignes de codes effectuées
var clic = document.getElementById('clic');
var clicScore = 1;

var item = []; //contient les tableaux des bonus et des aides

var nomitem = ["bonus", "aide"]; //nom des items

/********************************************format des balises des items : ********************************************
* div englobant : NombaliseNumérobalise (bonus0, aide1) ****************************************************************
* image clicable : NombaliseNumérobalise-img (bonus0-img)***************************************************************
* prix pu prochain élement : NombaliseNumérobalise-prix (bonus0-prix)***************************************************
* nombre d'élements actifs : NombaliseNumérobalise-nbre (bonus0-nbre...)************************************************
* action effective de tous les élements de même item : NombaliseNumérobalise-eff (bonus0-eff) **************************
***********************************************************************************************************************/

/* initialisation des items */
for (i = 0; i < 2 ; i++) {
    item[i] = [];
    for (j = 0; j < nomitem.length; j++) {
        item[i][j] = [];
        item[i][j][0] = document.getElementById(nomitem[i] + j);
        item[i][j][1] = document.getElementById(nomitem[i] + j + "-img");
        item[i][j][2] = document.getElementById(nomitem[i] + j + "-prix");
        item[i][j][3] = document.getElementById(nomitem[i] + j + "-nbre");
        item[i][j][4] = document.getElementById(nomitem[i] + j + "-eff")
    }
}

/***********************************************************
*** initialisation spécifique des attributs des items*******
***[5,6] = [coût incrémentation du prix, bonus d'un item]***
***********************************************************/


    item[0][0][5] = 10;
    item[0][0][6] = 1;
    item[0][1][5] = 20;
    item[0][1][6] = 5;
    
    item[1][0][5] = 30;
    item[1][0][6] = 1;
    item[1][1][5] = 50;
    item[1][1][6] = 5;

    
    /* Ecouteurs d'action de l'utilisateur sur les différents élements de la page*/
        
        
    clic.addEventListener('click', 
        function () {
            ajoutClic(clicScore);
            if (!lance) {//Si on n'a pas appelé la fonction d'écoute de validité d'un achat
                lance = true; //permettra de lancer cette fonction une seule fois dans l'application
                
                intervalID = setInterval(//on vérifiera de manière régulière si l'on peut acheter un item
                    function() {
                        for (i = 0 ; i < item.length ; i++) {
                            for (j = 0 ; j < nomitem.length ; j++) {
                                if (ligne_code.innerHTML >= parseFloat(item[i][j][2].innerHTML)) { //Si l'on a accumulé suffisement de code pour acheter un item 
                                    if (item[i][j][0].classList.contains("hidden")) { //Si l'item est caché
                                        item[i][j][0].classList.remove("hidden"); //on le rend visible
                                    }
                                    item[i][j][1].classList.remove("grise");// on enlève l'effet grisé de l'image
                                }
                                else if (!item[i][j][1].classList.contains("grise")){
                                    item[i][j][1].classList.add("grise");// on ajoute l'effet grisé de l'image car on ne peut pas le payer
                                }
                            }
                        }
                    },
                    100); //on vérifie tous les 0.1 secondes
                }
            },
        false); //Si on clic sur l'image, on appelle une fois la fonction d'ajout d'un clic
    
    /* pour tous les bonus et les aides, on établit un écouteur d'évenement sur l'image*/
    
    for (i = 0; i < item.length ; i++ ) {
        for (j = 0; j < nomitem.length; j++) {
            item[i][j][1].addEventListener('click', (function(arg1, arg2) {//Si on clic sur un bonus
                return function() { 
                    if (ligne_code.innerHTML >= parseFloat(item[arg1][arg2][2].innerHTML)) { //Si on a assez de code pour acheter l'item
                        action_commune (arg1, arg2);
                    }
                };   
            }) (i,j), false);
        }
    }
        
    /* Fonctions génériques utilisées par tous les élements */
    
    function ajoutClic (clic) { //Fonction générique d'ajout d'un seul élement de code au total
        ligne_code.innerHTML = parseFloat(ligne_code.innerHTML) + clic; // On ajoute la valeur de l'ajout au montant de code total et on affiche la nouvelle valeur du code
    }
    
    function action_commune (numitem, idelem) {
        
        ligne_code.innerHTML = parseFloat(ligne_code.innerHTML) - parseFloat(item[numitem][idelem][2].innerHTML);
        item[numitem][idelem][3].innerHTML++; // On augmente le nombre de bonus et on affiche ce nouveau nombre
        item[numitem][idelem][2].innerHTML= parseFloat(item[numitem][idelem][2].innerHTML) + item[numitem][idelem][5]; //on ajoute l'incrément du prix et on affiche le nouveau prix
        item[numitem][idelem][1].classList.add("grise");
            
        if (numitem == 0) { //si on est dans les bonus
            item[numitem][idelem][5] *= 4; //on multiplie le prochain incrément pour que ce soit de plus en plus cher d'acheter un bonus
            clicScore += item[numitem][idelem][6];
        }
        else if (numitem == 1) {
            item[numitem][idelem][5] *= 5; //on multiplie le prochain incrément pour que ce soit de plus en plus cher d'acheter un bonus
            delai = delai_base / (parseFloat(item[numitem][idelem][3].innerHTML)); //On définit le délai d'appel de l'autoclic par les aides
            intervalID = setInterval(
                function() {
                    ajoutClic(item[numitem][idelem][6]);
                },
                delai); //On appelle la fonction d'ajout d'un clic selon le delai d'appel
        }
        item[numitem][idelem][4].innerHTML = parseFloat(item[numitem][idelem][3].innerHTML * item[numitem][idelem][6]);
    }
