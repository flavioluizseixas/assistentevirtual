import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false
// font Awesome para icones do projeto 
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = axios; //this.$http;

axios
  .get("https://assistentevirtualcovid19.herokuapp.com/session.php")
  .then(response => {
    console.log(response);
    response = response.data;
    Vue.prototype.$session_id = response;
  });
