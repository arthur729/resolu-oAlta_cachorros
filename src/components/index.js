const { MongoClient } = require('mongodb');

// Substitua pela sua string de conexão
const uri = 'mongodb+srv://arthurwarken13:Y6sudIhqUtij1jFP@cluster0.f0mm2dl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const uri = "mongodb+srv://arthurwarken13:Y6sudIhqUtij1jFP@cluster0.f0mm2dl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Cria uma nova instância do cliente MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Conecta ao cliente MongoDB
    await client.connect();

    console.log("Conectado com sucesso ao cluster MongoDB!");

    // Aqui você pode acessar suas coleções e realizar operações

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  } finally {
    // Fecha a conexão
    await client.close();
  }
}

main().catch(console.error);
