<template>
  <div>
    <div class="header">
      <div class="container">
        <input @change="getJson" type="file" name="" id="">
        <div class="user-name" v-if="content.length !== 0">Диалог с <a :href="'http://vk.com/id'+content.meta.p" target="_blank">{{content.meta.t}}</a></div>
        <button v-if="content.length !== 0" @click="clear">Очистить</button>
      </div>
    </div>
    <div class="dialog-container">
      <div v-for="mes in messages" :class="{'message-from': content.meta.p == mes.f, 'message-to': content.meta.p != mes.f}">
        <div class="text">
          {{mes.t}}
          <div v-if="mes.a">
            <div v-for="item in mes.a">
              <img v-if="item.t === 0" :src="item.s.m ? item.s.m : item.s.s ? item.s.s : item.s.n ? item.s.n : item.s.o ? item.s.o : item.s.t" alt="">
              <img v-if="item.t === 4" :src="'https://vk.com/images/stickers/'+item.i+'/256.png'" alt="">
            </div>
          </div>
          <div class="reply" v-if="mes.m">
            <div v-for="rep in mes.m">
              <div class="text">
                <div class="from">От <a :href="'https://vk.com/id'+rep.f" target="_blank">{{content.meta.p == rep.f?content.meta.t:'id'+rep.f}}</a></div>
                {{rep.t}}
              </div>
              <div class="date">{{rep.d | moment("H:mm DD.MM.YY")}}</div>
            </div>
          </div>
        </div>
        <div class="date">{{mes.d + 1138744800 | moment("H:mm DD.MM.YY")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'StartPage',
  data () {
    return {
      content: [],
      messages: []
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
        _this.messages = _this.content.data.reverse();
      }
    },
    clear () {
      this.content = [];
      this.messages = [];
    }
  }
}
</script>

<style scoped lang="scss">
  body {
    margin: 0;
  }
  .header {
    height: 40px;
    background: #ddd;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-family: sans-serif;
    z-index: 3;
    .container {
      width: 822px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .text {
    img {
      max-width: 600px;
    }
  }
  .dialog-container {
    width: 800px;
    border: 1px solid #aaa;
    margin: auto;
    padding: 10px;
    background: #eee;
    font-size: 14px;
    font-family: sans-serif;
    margin-top: 55px;
    .message-from {
      background: #fff;
      margin: 3px 0;
      .date {
        font-style: italic;
        color: #868686;
        font-size: 11px;
        position: absolute;
        left: 700px;
        bottom: 0;
        min-width: 100px;
        text-align: right;
      }
      .reply {
        max-width: 500px;
        border: 1px solid #bbb;
        padding: 5px;
        background: #ccc;
        margin-left: 100px;
        .date {
          left: 0 !important;
          text-align: right;
          right: 520px !important;
          bottom: 5px !important;
        }
        .text {
          img {
            max-width: 500px;
          }
        }
      }
    }
    .message-to {
      background: #ccf7ff;
      margin: 3px 0 3px 80px;
      .date {
        font-style: italic;
        color: #868686;
        font-size: 11px;
        position: absolute;
        left: 620px;
        bottom: 0;
        min-width: 100px;
        text-align: right;
      }
      .reply {
        max-width: 500px;
        border: 1px solid #bbb;
        padding: 5px;
        background: #ccc;
        margin-left: 100px;
        .date {
          left: 0 !important;
          text-align: right;
          right: 520px !important;
          bottom: 5px !important;
        }
        .text {
          img {
            max-width: 500px;
          }
        }
      }
    }
    .message-from,
    .message-to {
      max-width: 600px;
      border: 1px solid rgba(117, 117, 117, 0.32);
      padding: 5px 10px;
      position: relative;
    }
  }
    
</style>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
