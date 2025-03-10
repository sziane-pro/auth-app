import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware pour gérer le JSON
app.use(express.json());

// Simulation d'une base de données d'utilisateurs
const users = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$eHX2KuwSYh5D9PLUYo.lgeRVc5be5uXsLzMdzAB.TGV/YKg6L5blC' // password: 'password123'
  }
];

// 👉 Route de test
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue dans auth-app !" });
});

// 👉 Route d'inscription
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nom d’utilisateur et mot de passe requis.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ id: users.length + 1, username, password: hashedPassword });

  res.status(201).json({ message: 'Utilisateur inscrit avec succès !' });
});

// 👉 Route de connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Nom d’utilisateur ou mot de passe incorrect.' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'Connexion réussie !', token });
});

// 👉 Route protégée (exemple)
app.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token manquant.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalide.' });

    res.json({ message: `Accès autorisé pour l'utilisateur : ${decoded.username}` });
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ auth-app est lancé sur http://localhost:${PORT}`);
});
