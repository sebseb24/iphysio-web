# iphysio-web
# Configuration initiale du projet

1. Installation de Node.js pour utiliser npm : https://nodejs.org/en/

2. Lancer le script first-time.bat pour installer nodemon et le CLI d'Angular.  Si le script ne se lance pas, vérifiez que NPM est bien installé grâce à la commande npm -v

3. Redémarrez l'ordinateur

# Pour compiler le projet :

Lancer les scripts :
  - 1-start-mongo-server.bat
  - 2-start-project-server.bat

Le deuxième est long et il prend du temps à afficher de l'information, donc lui laisser environ 5 minutes, même si aucune progression n'est affichée

Ouvrir un navigateur et accéder à la page localhost:4200

** Si des erreurs surviennent durant l'exécution des scripts ci-haut :
  - Lancer le script update.bat
  - Dans une invite de commande, aller dans (...)/iphysio-web/NodeJS et lancer la commande :  npm i --save cors express mongoose body-parser bcrypt


# Selenium - Tests automatisés

Installation et configurations de Selenium avant son utilisation 

Selenium est un outil permettant d’automatiser des tests sur l’interface utilisateur d’un site web. Il permet d’automatiquement cliquer à des endroits sur une page ou de remplir des formulaires. 

Étape 1. Installer Selenium 

L’installation de selenium peut varier selon votre environnement de développement 

NodeJS : 

Sous le répertoire de votre projet 

npm install selenium-webdriver 

Étape 2. Télécharger les web drivers 

Téléchargé le web driver du navigateur avec lequel vous allez effectuer les tests et selon la version du navigateur que vous utiliserez. 

Chrome :  

https://sites.google.com/a/chromium.org/chromedriver/downloads 

Firefox : 

https://github.com/mozilla/geckodriver/releases 

Edge : 

https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/#downloads 

 

Étape 3. Ajouter le chemin vers les web driver dans la variable d’environnement PATH 

 

Sous Windows: 

Dans la barre de recherche écriver “variable” : 

 

Shape
