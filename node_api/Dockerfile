# Utilisation d'une image de node.js
FROM node:14-alpine

# Configuration de l'environnement
WORKDIR /app
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Exposition du port
EXPOSE 3001

# Commande pour démarrer l'API Node.js
CMD ["npm", "start"]
