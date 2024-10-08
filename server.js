const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Adiciona suporte para CORS
const bodyParser = require('body-parser');

// Conexão com o MongoDB Atlas (substitua pelas suas credenciais)
mongoose.connect('mongodb+srv://seuUsuario:suaSenha@seuCluster.mongodb.net/seuBancoDeDados?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conversationSchema = new mongoose.Schema({
  userId: String, // ID do usuário
  messages: [{
    sender: String, // Usuário ou bot
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const loginSchema = new mongoose.Schema({
  userId: String, // ID do usuário
  timestamp: { type: Date, default: Date.now },
  ip: String
});

const Conversation = mongoose.model('Conversation', conversationSchema);
const Login = mongoose.model('Login', loginSchema);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Permite analisar JSON no corpo da solicitação

// Rota para salvar o histórico do chat
app.post('/mensagem', async (req, res) => {
  const novaConversa = new Conversation({
    userId: req.body.userId, // Obter o ID do usuário da requisição
    messages: [{
      sender: 'usuário',
      text: req.body.mensagem,
      timestamp: Date.now()
    }]
  });
  await novaConversa.save();
  res.json(novaConversa);
});

// Rota para registrar login
app.post('/login', async (req, res) => {
  const novoLogin = new Login({
    userId: req.body.userId, // Obter o ID do usuário da requisição
    ip: req.body.ip, // Obter o IP do usuário da requisição
  });
  await novoLogin.save();
  res.json({ message: 'Login registrado com sucesso!' });
});

// Exemplo de rota para recuperar histórico de conversas (implemente a lógica de busca)
app.get('/conversas/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Busca por todas as conversas com o userId correspondente
    const conversas = await Conversation.find({ userId });

    // Verifica se foram encontradas conversas
    if (conversas.length > 0) {
      res.json(conversas);
    } else {
      res.status(404).json({ message: 'Nenhuma conversa encontrada para este usuário.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar conversas.' });
  }
});
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});