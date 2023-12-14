# Projet AZIA

Le projet AZIA est une application web développée avec React, Node.js et Python. Il permet aux utilisateurs de partager leurs préférences en matière de couleur, de musique, d'alcool, de soda, et bien plus encore.

## Prérequis

- Docker
- Docker Compose

## Configuration

Le projet est divisé en trois services Docker distincts :
- `frontend` : Interface utilisateur React.
- `node_api` : API Node.js pour les formulaires textuels.
- `ai_cognitive` : API Python pour le traitement des images.

## Instructions pour lancer le projet

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.

2. Clonez ce dépôt sur votre machine locale :

```bash
 git clone https://github.com/your-username/projet-azia.git 
 ```

3. Accédez au répertoire du projet :

```bash
 cd projet-azia 
 ```

4. Lancez le projet avec Docker Compose :

```bash
 docker-compose up --build 
 ```

- L'option `--build` est utilisée pour reconstruire les images Docker au besoin.

5. Une fois les conteneurs démarrés, ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000) pour utiliser l'application AZIA.

## Arrêt du projet

Pour arrêter le projet, utilisez la combinaison de touches `Ctrl+C` dans le terminal où Docker Compose est en cours d'exécution.

Si vous souhaitez supprimer les conteneurs et les volumes associés, utilisez la commande suivante :

```bash
 docker-compose down -v 
 ```

Cela arrêtera et supprimera les conteneurs, ainsi que les volumes Docker associés.

---

N'hésitez pas à personnaliser ce fichier README en fonction des détails spécifiques de ton projet et des commandes Docker que tu utilises.
