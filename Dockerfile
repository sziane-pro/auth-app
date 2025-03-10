# Utilisation de l'image Node.js officielle
FROM node:18

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers du projet
COPY package*.json ./
COPY . .

# Installation des dépendances
RUN npm install

# Port exposé
EXPOSE 3000

# Commande de lancement de l'application
CMD ["npm", "start"]
