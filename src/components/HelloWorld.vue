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
  font-family: 'Montserrat', sans-serif;
  background-color: #f5f5f5; /* Fundo mais claro */
  color: #333;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.item {
  margin-bottom: 40px;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.description {
  font-size: 18px;
  line-height: 1.5;
}

.pequena-imagem {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
