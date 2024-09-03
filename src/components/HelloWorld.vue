<template>
  <div class="container">
    <div class="item">
      <h2 class="title">O Cão Alegre</h2>
      <img v-lazy="require('@/assets/dog.webp')" alt="Imagem do dog" class="pequena-imagem">
      <p class="description">Os cães são conhecidos por sua lealdade e capacidade de alegrar a vida das pessoas. Aqui está um exemplo de um cão feliz desfrutando de um passeio ao ar livre.</p>
    </div>
    <div class="item">
      <h2 class="title">A Raça Dachshund</h2>
      <img v-lazy="require('@/assets/salsicha.webp')" alt="Imagem de salsicha com lazy loading" class="pequena-imagem">
      <p class="description">A raça Dachshund, muitas vezes chamada de "salsicha" devido ao seu corpo longo e pernas curtas, é conhecida por sua personalidade animada e inteligente.</p>
    </div>
    <div class="item">
      <h2 class="title">Diversão Canina</h2>
      <img v-lazy="require('@/assets/cachorro.webp')" alt="Imagem de cachorro com lazy loading" class="pequena-imagem">
      <p class="description">Os cachorros podem ser extremamente divertidos e cheios de energia. Veja esta imagem de um cachorro brincando e mostrando sua personalidade vibrante.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style>
/* Centraliza o corpo da página */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ajuste para ocupar a altura total da tela */
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%; /* Ajuste conforme necessário */
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.pequena-imagem {
  width: 500px;
  height: auto;
  margin-bottom: 10px; /* Espaço entre a imagem e o texto */
  border-radius: 15px; /* Arredonda as bordas da imagem */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra sutil */
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  text-align: center;
}
</style>
