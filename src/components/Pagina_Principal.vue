<template>
  <div class="container">
    <h1>BombaChat</h1>
    <div id="chat-output" class="chat-output"></div>
    <form id="chat-form" class="chat-form" @submit.prevent="handleSubmit">
      <textarea id="user-input" rows="4" placeholder="Digite sua resposta..." required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-position: center;
}

.container {
  background: #ffffffe0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 350px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.chat-output {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  flex-grow: 1;
  background-color: #fafafa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  resize: none;
  box-sizing: border-box;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

.message {
  padding: 10px;
  border-radius: 15px;
  max-width: 80%;
  position: relative;
  word-wrap: break-word;
  font-size: 15px;
}

.message.user {
  background-color: #e1f5fe;
  border: 1px solid #b3e5fc;
  align-self: flex-end;
  margin-left: auto;
}

.message.user::before {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #e1f5fe transparent;
}

.message.ai {
  background-color: #d4edda; /* Verde claro */
  border: 1px solid #c3e6cb; /* Verde mais escuro */
  align-self: flex-start;
  margin-right: auto;
}

.message.ai::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #d4edda transparent;
}

@media (max-width: 600px) {
  .message {
    max-width: 100%;
  }
}
</style>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  name: 'PaginaPrincipal',
  data() {
    return {
      apiKey: "AIzaSyClrsUNIl7nnDV8-_MOEy_OU7yNgd8hu_g", // Substitua pela sua chave API real
      chatSession: null,
    };
  },
  methods: {
    async startChat() {
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      this.chatSession = await model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              { text: "gemine agora voce é um personal treiener chamado karl que está conversando comigo de maneira informal e frases curtas sobre academia\n" },
            ],
          },
        ],
      });
    },
    async sendMessage(message) {
      if (!this.chatSession) {
        await this.startChat();
      }
      try {
        const result = await this.chatSession.sendMessage(message);
        return result.response.text();
      } catch (error) {
        console.error('Error:', error);
        if (error.message.includes("SAFETY")) {
          return 'Desculpe, a resposta foi bloqueada devido a problemas de segurança.';
        }
        return 'Desculpe, ocorreu um problema ao gerar a resposta.';
      }
    },
    async saveChatHistory(historyData) {
      try {
        const response = await fetch('http://localhost:5000/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(historyData),
        });
        if (!response.ok) {
          throw new Error('Erro ao salvar o histórico');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async handleSubmit() {
      const userInput = document.getElementById('user-input');
      const message = userInput.value;

      // Exibir mensagem do usuário
      const chatOutput = document.getElementById('chat-output');
      chatOutput.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;

      // Enviar mensagem e exibir resposta da IA
      const response = await this.sendMessage(message);
      chatOutput.innerHTML += `<div class="message ai"><strong>AI:</strong> ${response}</div>`;
      

      // Salvar o histórico na nuvem
      await this.saveChatHistory({
        userMessage: message,
        aiResponse: response,
        timestamp: new Date().toISOString()
      });

      chatOutput.scrollTop = chatOutput.scrollHeight;
      userInput.value = '';
    },
  },
  mounted() {
    this.startChat();
  },
};
</script>