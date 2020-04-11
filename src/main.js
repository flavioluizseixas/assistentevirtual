import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = axios; //this.$http;

axios
  .get("session.php")
  .then(response => {
    console.log(response);
    response = response.data;
    Vue.prototype.$session_id = response;
  });
