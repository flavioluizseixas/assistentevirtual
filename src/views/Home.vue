<template>
  <div class="hello">
    <Elaine />
  </div>
</template>

<script>
import Elaine from '@/components/Elaine';

export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Elaine
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
