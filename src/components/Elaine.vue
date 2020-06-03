<template>
  <span>
    <img height="150" src="@/assets/medica.png" alt="Elaine" />
    <h2>{{ msg }}</h2>
  <!-- Implementação do chat --> 
    <div class="chat">
      <ul class="content" id="content">
        <div v-for="(message, idx) in messages" v-bind:key="idx"> 
          <li v-if="message.author === 'User'" class="user-msg">{{message.text}}<span class="date">{{message.date}}</span></li>
          <li v-if="message.author === 'Bot'" class="bot-msg">{{message.text}}<span class="date">{{message.date}}</span></li>
        </div>
        
      </ul>
      <input class="input-elaine" type="type" v-model="usuarioTexto" placeholder="O que você quer falar?" id="input" @keyup="onButtonPressed($event)" />
      <button @click="recebeTexto()" class="btn-elaine" id="sendButton"> <vue-fontawesome icon="paper-plane" size="1.5" color="gray"></vue-fontawesome></button>
      <button @click="vozTexto()" class="btn-elaine"><vue-fontawesome icon="microphone" size="1.5" color="gray"></vue-fontawesome></button>
    </div>
    <!-- Fim da implementação do chat --> 
  </span>
</template>

<script>
import * as moment from 'moment';
// moment utilizado para geração da Data
export default {
  name: "Elaine",
  data() {
    return {
      msg: "Olá, tudo bem?",
      usuarioTexto: "",
      pagina: "", 
      // messages é o array de mensagens que vai estar na tela 
      messages:[],
      moment: moment
    };
  },
  methods: {
    recebeTexto() {
      // verifica se o texto do usuário não está vazio 
      if (this.usuarioTexto == "") {
        return;
      }

      //verifica se tem sessionId para enviar mensagem 
      if (this.$session_id) {
        //URLSearchParams
        // cria o objeto de mensagem
        let userMessage = {
          author: "User", 
          text: this.usuarioTexto,
          date: this.moment().format('HH:mm').toString()
        }
        // Adicionando mensagem do Usuário no array de mensagens 
        this.messages.push(userMessage);
        let p = new URLSearchParams();
        p.append("mensagem", this.usuarioTexto);
        p.append("session_id", this.$session_id);
        this.usuarioTexto = "";

        this.chatScroll();
        this.$http.post("https://assistentevirtualcovid19.herokuapp.com/api.php", p).then(response => {
          // Montando a mensagem do Bot 
          let botMessage = {
            author:"Bot",
            date: this.moment().format('HH:mm').toString()
          }

          if (response.data.output.generic[1]) {
            botMessage.text= response.data.output.generic[0].text + " " + response.data.output.generic[1].text;
          }
          else {
            botMessage.text = response.data.output.generic[0].text;
          }
          // Adicionando mensagem do Bot no array de mensagens 
          this.messages.push(botMessage)

          this.textoVoz(botMessage.text);

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
            this.colocaBotaoDeEnvioCinza()
            this.chatScroll();
          }
        });
      }
      this.chatScroll();
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
        let texto = event.results[0][0].transcript;
        this.usuarioTexto = texto;
        this.recebeTexto();
      };
    },
    chatScroll(){
      setTimeout(()=>{
      const objDiv = document.getElementById("content");
      objDiv.scrollTop = objDiv.scrollHeight;
      },300);
      setTimeout(()=>{
      const objDiv = document.getElementById("content");
      objDiv.scrollTop = objDiv.scrollHeight;
      },600);

    }, 
    onButtonPressed(event){
      const ENTER_CODE = "Enter"
      let input = document.getElementById("input").value
      if (event.code===ENTER_CODE){
        this.colocaBotaoDeEnvioCinza()
        this.recebeTexto();
      }
      if (input!=''){
        this.colocaBotaoDeEnvioAzul()
      }else{
        this.colocaBotaoDeEnvioCinza()
      }
    }, colocaBotaoDeEnvioAzul(){
        document.getElementById("sendButton").children[0].style.color="darkblue";
    }, colocaBotaoDeEnvioCinza(){
      document.getElementById("sendButton").children[0].style.color="gray";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  transition:0.5s;
    scroll-behavior: smooth;

}
.btn-elaine {
  width: 43px;
  display:inline-block;
  font-size: 18px;
  height: 36px;
  background:none;
  border:none;
}

.input-elaine {
  width:67%;
  border:1px solid gray; 
  border-radius:10px;
  background-color:transparent;
  display: inline-block;
  box-sizing:border-box;
  padding-left:20px;  
  height: 40px;
  font-size: 18px;
}
.chat { 
  display:block;
  max-width:800px;
  height:500px;
  border:1px solid black;
  border-radius:10px;
  margin: 0 auto;
}
.chat .content{
  width:100%;
  height:415px;
  overflow:auto;
  border-bottom:1px solid gray;
  padding-top:50px;
  transition:1s;
  padding:0px;
}
.chat .content li{
  list-style:none;
  text-align:left;
  display:table;
  font-weight:bold;
  min-width:100px;
  border-radius:20px;
  color:white;
  margin-bottom:10px;
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
.chat .content li .date{
  font-size: 11px;
  display: block;
  margin-top: 10px;
  margin-bottom: -10px;
}
.fas {
  color:black;
}
</style>