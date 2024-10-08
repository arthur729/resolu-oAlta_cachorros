<template>
  <Pagina_Principal msg="Welcome to Your Vue.js App"/>
  <div class="footer-name">Arthur Warken Magalhães</div>
</template>

<script>

import Pagina_Principal from './components/Pagina_Principal.vue'

export default {
  name: 'App',
  components: {
    Pagina_Principal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-image: url('@/assets/bombados.webp');
  background-size: cover; /* Ajusta a imagem para cobrir toda a área */
  background-position: center; /* Centraliza a imagem */
  background-repeat: no-repeat; /* Impede que a imagem se repita */
  background-attachment: fixed;
  

}
.footer-name {
  position: fixed; /* Fixa a posição do nome */
  bottom: 10px; /* Distância do fundo da tela */
  right: 10px; /* Distância da direita da tela */
  font-size: 12px; /* Tamanho da fonte */
  color: rgba(255, 255, 255, 0.7); /* Cor branca com leve transparência */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo preto semi-transparente para melhor legibilidade */
  padding: 5px; /* Espaçamento interno */
  border-radius: 5px; /* Bordas arredondadas */
}
</style>
