<template>
  <span>
    <img height="350" src="@/assets/assistente.jpeg" alt="Elaine" />
    <h2>{{ msg }}</h2>
    <p>
      <input
        class="input-elaine"
        type="type"
        v-model="usuarioTexto"
        placeholder="O que você quer falar?"
      />
    </p>
    <button @click="recebeTexto()" class="btn-elaine">Ok</button>
    <button @click="vozTexto()" class="btn-elaine">MIC</button>
  </span>
</template>

<script>

export default {
  name: "Elaine",
  data() {
    return {
      msg: "Olá, tudo bem?",
      usuarioTexto: ""
    };
  },
  methods: {
    recebeTexto() {
      if (this.usuarioTexto == "") {
        return;
      }

      if (this.$session_id) {
        //URLSearchParams
        let p = new URLSearchParams();
        p.append("mensagem", this.usuarioTexto);
        p.append("session_id", this.$session_id);
        this.$http.post("api.php", p).then(response => {
          console.log(response);
          console.log(this.$session_id);
          this.msg = response.data.output.generic[0].text;
          this.textoVoz(this.msg);

          for (let item of response.data.output.entities) {
            if (item.entity == "Pagina") {
              if (item.value == "ic") {
                setTimeout(() => {
                  window.open("http://www.ic.uff.br", "_blank");
                }, 3000);
              }
              if (item.value == "google") {
                setTimeout(() => {
                  window.open("https://www.google.com.br", "_blank");
                }, 3000);
              }
            }
          }
        });
        this.usuarioTexto == "";
      }
    },
    textoVoz(msg) {
      if('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = 'pt-BR';
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    },
    vozTexto() {
      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      //let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      //let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
      let recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.maxAlternatives = 1;
      recognition.start();

      recognition.onresult = event => {
        console.log(event);
        let texto = event.results[0][0].transcript;
        console.log(texto);
        this.usuarioTexto = texto;
        this.recebeTexto();
      };
    }
  }
};
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
