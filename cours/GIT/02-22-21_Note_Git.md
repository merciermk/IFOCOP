# Cours GIT/terminal du 02/22/21

## terminal

pwd : print working directory

cd : change directory

cd / : permet de remonter au plus haut dans les directory

rwx > read write execution. 1er groupe RWX utilisateur / 2 eme , le groupe / le 3 eme tout le monde

history > pour voir l'historique de commande

mv > renommer un dossier ou le deplacer

touch > creer un fichier

## git

n'enregistre que les differences entre les versions.

git init > initialise le repository

git config user.name Mike Mercier> configure le nom
git config user.email mail@mail.com > configure le mail

git add > ajouter un fichier
git status > connaitre le status

git commit -m "message du commit"

git reset --hard HEAD (head ou numéro du commit) > permet de reinitialiser au commit demandé, supprime les commits plus recents !

git commit --amend > permet de modifier le descriptif du dernier commit fait (pas les autre)

git branch > creer une nouvelle branche.
git checkout > changer de branch

git stash > garde de coté le travail effectué sans commit
git stash-apply > reprendre le travail mis en pause

## faire une fusion de deux branches

- git merge branche_a_recevoir > fusionner deux branches (note : se mettre sur la branche qui va recevoir)
- Résolution des conflits s'il y a (directement dans le document annoncé par git)
- git commit sans -m
  =======> fin de la fusion

## utiliser un serveur externe (github)

git remote add nom_a_definir adresse_du_site
git push : envoyer les documents git sur le serveur
git remote > pour voir les serveurs distants
