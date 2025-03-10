# Auth-App

Auth-App est une application d'authentification simple avec JWT et bcrypt.

---

## ⚙️ Installation

1. **Cloner le projet**
```bash
git clone https://github.com/sziane-pro/auth-app.git
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env.example .env
```

4. **Lancer le projet**
```bash
npm run dev
```

5. **Accéder à l'application**
- [http://localhost:3000](http://localhost:3000)

---

## 🐳 Utilisation avec Docker

1. **Build l'image Docker**
```bash
docker build -t auth-app .
```

2. **Lancer le conteneur**
```bash
docker run -p 3000:3000 --env-file .env auth-app
```
