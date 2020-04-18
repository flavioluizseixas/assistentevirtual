<template>
  <span>
    <img height="150" src="@/assets/medica.png" alt="Elaine" />
    <h2>{{ msg }}</h2>
    <div class="chat">
    <ul class="content" id="content">
    <div v-for="message in messages" :key="message"> 
      <li v-if="message.author === 'User'" class="user-msg">{{message.text}}</li>
      <li v-if="message.author === 'Bot'" class="bot-msg">{{message.text}}</li>

    
    </div>
    
    </ul>
    <input class="input-elaine" type="type" v-model="usuarioTexto" placeholder="O que você quer falar?" id="input" />
    <button @click="recebeTexto()" class="btn-elaine">Ok</button>
    <button @click="vozTexto()" class="btn-elaine">MIC</button>
    </div>

  </span>
</template>


<script>
export default {
  name: "Elaine",
  data() {
    return {
      msg: "Olá, tudo bem?",
      usuarioTexto: "",
      pagina: "", 
      messages:[],
    };
  },
  methods: {
    recebeTexto() {
      if (this.usuarioTexto == "") {
        return;
      }

      if (this.$session_id) {
        //URLSearchParams
        const userMessage = {
          author: "User", 
          text: this.usuarioTexto
        }
        this.messages.push(userMessage);
        let p = new URLSearchParams();
        p.append("mensagem", this.usuarioTexto);
        p.append("session_id", this.$session_id);

        this.chatScroll();
        this.$http.post("api.php", p).then(response => {
        this.usuarioTexto = "";
          console.log(response);
          let botMessage = {
            author:"Bot"
          }

          if (response.data.output.generic[1]) {
            botMessage.text= response.data.output.generic[0].text + " " + response.data.output.generic[1].text;
          }
          else {
            botMessage.text = response.data.output.generic[0].text;
          }
          this.messages.push(botMessage)

          this.textoVoz(this.msg);

          if (response.data.context.skills["main skill"].user_defined) {
            if (response.data.context.skills["main skill"].user_defined.pagina) {
              this.pagina =
                response.data.context.skills["main skill"].user_defined.pagina;

              if (this.pagina) {
                if (this.pagina == "covid19-oms-symptoms") {
                  setTimeout(() => {
                    window.open(
                      "https://www.who.int/health-topics/coronavirus#tab=tab_3",
                      "_blank"
                    );
                  }, 3000);
                }
                if (this.pagina == "covid19-oms-prevention") {
                  setTimeout(() => {
                    window.open(
                      "https://www.who.int/health-topics/coronavirus#tab=tab_2",
                      "_blank"
                    );
                  }, 3000);
                }
                if (this.pagina == "covid19-oms-overview") {
                  setTimeout(() => {
                    window.open(
                      "https://www.who.int/health-topics/coronavirus#tab=tab_1",
                      "_blank"
                    );
                  }, 3000);
                }
              }
            }
          }
          setTimeout(()=>{
          this.chatScroll();
          },500)
        });
      }
    },
    textoVoz(msg) {
      if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = "pt-BR";
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    },
    vozTexto() {
      let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      //let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      //let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
      let recognition = new SpeechRecognition();
      recognition.lang = "pt-BR";
      recognition.maxAlternatives = 1;
      recognition.start();

      recognition.onresult = event => {
        console.log(event);
        let texto = event.results[0][0].transcript;
        console.log(texto);
        this.usuarioTexto = texto;
        this.recebeTexto();
      };
    },
    chatScroll(){
      const objDiv = document.getElementById("content");
      objDiv.scrollTop = objDiv.scrollHeight;

    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-elaine {
  width: 50px;
  display:inline-block;
  font-size: 18px;
  height: 36px;
}

.input-elaine {
  width: 380px;
  display: inline-block;
  height: 30px;
  font-size: 18px;
}
.chat { 
  display:block;
  width:500px;
  height:500px;
  border:1px solid black;
  border-radius:5%;
  margin: 0 auto;
}
.chat .content{
  width:100%;
  height:400px;
  overflow-y: scroll;
  transition:1s;
  padding:0px;
}
.chat .content li{
  list-style:none;
  text-align:left;
  display:table;
  min-width:100px;
  border-radius:20px;
  color:white;
  margin-top:10px;
  padding:20px;
}
.user-msg{
  background-color:blue;
  margin:0 10px 10px auto;
}
.bot-msg{
  background-color:green;
  margin-left:10px;
  margin-right:100px;
}
</style>