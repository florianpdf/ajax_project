Project Ajax
==============
####Objectif:
Mise en place d'une fonctionnalité AJAX sur un formulaire

####Pré-requis: 
composer ==> [Install Composer](https://getcomposer.org/doc/00-intro.md)

#### Initialisation du projet
1. **Avec ssh**: git clone git@github.com:florianpdf/ajax_project.git
2. **Sans ssh**: git clone git@github.com:florianpdf/ajax_project.git
3. cd ajax_project
4. composer install
5. php app/console doctrine:database:create
6. php app/console doctrine:schema:update --force
7. php app/console asset:install
