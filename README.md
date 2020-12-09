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


