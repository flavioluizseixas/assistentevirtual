<template>
  <div class="about">
    <h3>Desenvolvido por</h3><h3>Flávio Luiz Seixas</h3>
    <p>Este aplicativo se trata de um protótipo de um Agente Inteligente Conversacional.</p>
    <p>NÃO deve ser utilizado para propósitos clínicos!</p>
    <p>
      <img height="50" src="@/assets/Logo_UFF.png" alt="UFF" />
    </p>
    <button @click="abresite()" class="btn-elaine">Website</button>
    <p>
      <a href="mailto:fseixas@ic.uff.br?Subject=Chatbot%20App" rel="noopener noreferrer" target="_blank">Contact me</a>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    abresite() {
      window.open("http://www.ic.uff.br/~fseixas", "_blank");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-elaine {
  width: 100px;
  height: 50px;
}

.input-elaine {
  width: 300px;
  height: 50px;
  font-size: 18px;
}
</style>

