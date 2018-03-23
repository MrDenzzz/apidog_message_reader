<template>
  <div>
    <input @change="getJson" type="file" name="" id="">
    <pre>{{content}}</pre>
  </div>
</template>

<script>
export default {
  name: 'StartPage',
  data () {
    return {
      content: []
    }
  },
  methods: {
    getJson (e) {
      let files = e.target.files || e.dataTransfer.files,
          _this = this;
      if (!files.length)
        return;
      let file = files[0];
      let fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
      console.log('fr', fr)

      function receivedText(e) {
        console.log('lines',JSON.parse(e.target.result))
        let lines = e.target.result;
        _this.content = JSON.parse(lines);
      }
    }
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
