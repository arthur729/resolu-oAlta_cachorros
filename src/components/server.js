const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors'); // Adiciona suporte para CORS
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Substitua pela sua string de conexão
const uri = 'mongodb+srv://arthurwarken13:Y6sudIhqUtij1jFP@cluster0.f0mm2dl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Cria uma nova instância do cliente MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json()); // Permite analisar JSON no corpo da solicitação

// Rota para salvar o histórico do chat
app.post('/api/history', async (req, res) => {
  try {
    const { userMessage, aiResponse, timestamp } = req.body;

    if (!userMessage || !aiResponse || !timestamp) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Conecta ao cliente MongoDB
    await client.connect();
    const database = client.db('chatbot');
    const collection = database.collection('messages');

    // Insere o novo documento
    const result = await collection.insertOne({
      userMessage,
      aiResponse,
      timestamp,
    });

    res.status(201).json({ message: 'Histórico salvo com sucesso', result });
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
    res.status(500).json({ error: 'Erro ao salvar histórico' });
  } finally {
    // Fecha a conexão com o MongoDB
    await client.close();
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
