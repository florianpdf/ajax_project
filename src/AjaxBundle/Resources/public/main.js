// Fonction attachée à l'ajout de news

//  on('submit' => On écoute l'événement 'submit' de la balise <form> => $('form')
$('form').on('submit', function() {

    // On mémorise la variable 'this' (le formulaire) pour pouvoir l'utiliser dans le $.ajax
    var $this = $(this);

    //  On récupère les données du formulaire (les champs) dans un objet (data)
    var data = new FormData(this);

    // ------------------------------------------------------------------------Bouton >
    // Sauvegarde du bouton  (caractéristiques d'origine)
    var $button = $this.find('input[type=submit]');

    // Sauvegarde du label du bouton avant modification
    var initialText = $button.val();

    // Afin que l'utilisateur ne s'excite pas sur le bouton associé au formulaire
    //  On désactive celui-ci !!!
    //  Le label du bouton passe à 'Loading ...'
    $button.val("Loading...").prop('disabled', true);

    //  Ou mieux, pour cibler un bouton quand il y en a plusieurs dans la page
    // $("#valid").val("Loading...").prop('disabled', true);
    // ------------------------------------------------------------------------Bouton <

    // envoi de la requête au serveur en Ajax
    $.ajax({

        // On précise que c'est en mode POST
        type: 'POST',

        // Récupération de l'url associée à l'attribut action de la balise <form>
        url: $this.attr('action'),

        // Envoi des data
        data: data,
        // ?
        processData: false,

        // On le laisse gérer le type de contenu
        contentType: false,

        // Traitement suite au succès de la requête en Ajax
        success: function(data){

            // Pour debug : affichage dans la console du F12
            // console.log(data);

            // On a récupéré en JSON le contenu html de la nouvelle news
            $('tbody').prepend(data.template);

            // On tente de mettre le focus sur la dernière news ajoutée ... marche pas
            $('#'+data.id).focus();

            // Incrémentation du compteur de news
            //  $('#cptr').html() => Représente le contenu html de la zone contenant le compteur
            //  parseInt()  => Permet de transformer du texte en donnée numérique
            var $cptr = parseInt($('#cptr').html()) + 1;
            $('#cptr').html($cptr);

            // Vidage des champs du formulaire (title & content ... sont dans un bateau ...)
            // $("#news_title").val("");
            // $("#news_content").val("");
            // Vidage des champs du formulaire (méthode Laetitia : tout champ du formulaire)
            $this.find('input[type=text]').val('');
            $this.find('textarea').val('');
        },
        error: function(error){

        }
    });

    // ------------------------------------------------------------------------Bouton >
    //  Réactivation du bouton associé au formulaire ...  en remettant le label initial
    $button.val(initialText).prop('disabled', false);
    // ------------------------------------------------------------------------Bouton <
    return false;
});


// Fonction attachée au delete d'une news

//  on('click' => On écoute l'événement 'click' de la class "del_id"
$('.del_id').on('click', function() {

    // On mémorise la variable 'this' (le lien) pour pouvoir l'utiliser dans le $.ajax
    var $this = $(this);

    // Va rechercher l'id de la news dont on vient de demander le delete
    //    $this.closest('tr') => représente la balise <tr> la plus proche du lien
    //     Une fois trouvée, on récupère l'attribut id  => .attr('id')
    var $id_news = $this.closest('tr').attr('id');

    $.ajax({
        // On précise que c'est en mode POST
        type: 'POST',

        // Récupération de l'url via le contenu de l'attribut 'href' du lien
        url: $this.attr('href'),

        //  On envoi l'id
        data: $id_news,

        //  ?
        processData: false,

        // On le laisse gérer le type de contenu
        contentType: false,

        // Traitement suite au succès de la requête en Ajax
        success: function(data){

            // Pour debug : affichage dans la console du F12
            // console.log(data);

            // Suppression, dans la liste de news, de celle que l'on vient de deleter
            $('#'+data.id).remove();

            // Décrémentation du compteur de news
            //  $('#cptr').html() => Représente le contenu html de la zone contenant le compteur
            //  parseInt()  => Permet de transformer du texte en donnée numérique
            var $cptr = parseInt($('#cptr').html()) - 1;

            // Remplacement valeur du compteur dans la page
            $('#cptr').html($cptr);
        },
        error: function(error){

        }
    });
    return false;
});