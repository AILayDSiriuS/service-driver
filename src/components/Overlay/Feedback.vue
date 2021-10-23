<template>
  <div class="feedback-overlay-wrapper" ref="overlay-wrapper">
    <div class="feedback-overlay">
      <div class="feedback-top">
        <h2>Обратная связь</h2>
        <label for="textField">Введите свои пожелания здесь</label>
        <textarea id="textField" v-model="text"></textarea>
      </div>
      <div class="feedback-bottom">
        <Button isLink="false" @action="close" color="btn-b" textContent="Отмена" />
        <Button isLink="false" @action="sendFeedback" color="btn-outline-blue" textContent="Отправить" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FeedbackOverlay',
  props: {
    email: String,
    username: String
  },
  data: function() {
    return {
      text: '',
      userData: ''
    }
  },
  computed: {
    userDevice: function() {
      let msg = `\n\n
      --------------------------------\nДанная информация сгенерирована автоматически\nИмя пользователя: ${this.username}\nE-Mail пользователя: ${this.email}\nВеб-браузер пользователя: ${window.navigator.userAgent}\nIP-адрес пользователя: ${this.userData.ip}\nМестоположение на сайте: ${this.$route.path}\nРазрешение экрана пользователя: ${window.screen.width}x${window.screen.height}`;
      return msg;
    }
  },
  async beforeMount() {
    let url = 'https://json.geoiplookup.io';
    let response = await fetch(url);
    this.userData = await response.json(); // читаем ответ в формате JSON
  },
  methods: {
    close() {
      this.$emit('close')
    },
    sendFeedback() {
      let token;
      if(document.cookie) {
        let cookie = document.cookie;
        token = cookie.replace(/token=/g, '');
      }

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("message_subject", `[FEEDBACK] Обратная связь от ${this.username}`);
      urlencoded.append("message_text", `Фидбэк:\n${this.text}${this.userDevice}`);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/report", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            console.log(res);
            this.$emit('close');
          })
          .catch(error => console.log('error', error));
    }
  },
  components: {
    Button: () => import('@/components/Buttons/Button.vue')
  },
  mounted() {
    let vm = this;
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['overlay-wrapper']) {
        vm.close();
      }
    })
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['overlay-close']) {
        vm.close();
      }
    })
  }
}
</script>


<style scoped>
.feedback-overlay h2 {
  font-size: 32px;
  color: #3B405C;
}


.feedback-overlay-wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.65);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  cursor: default;
}
.feedback-overlay {
  position: fixed;
  z-index: 101;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.feedback-top {
  padding: 45px 30px;
  width: 570px;
  background: #fff;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow:    0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  box-shadow:         0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-flow: column nowrap;
}

.feedback-top label {
  margin-top: 45px;
  font-size: 16px;
  color: #9677F1;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 0;
}

.feedback-top textarea {
  margin-top: 0;
  background: none;
  border: none;
  border-bottom: 2px solid #9677F1;
  height: 148px;
  font-family: "Source Sans Pro", sans-serif;
  color: #6D7188;
  font-size: 18px;
  line-height: 25px;
  padding: 0;
  resize: none;
}

.feedback-top textarea:focus {
  border: none;
  outline: none;
  border-bottom: 2px solid #9677F1;
}

.feedback-bottom {
  width: 570px;
  height: 114px;
  background: #F7F7F7;
  border-radius: 0 0 30px 30px;
  padding: 0 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}

.feedback-bottom button:first-child {
  margin-right: 30px;
}

.feedback-bottom .left a {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  color: #C0BFD3;
  font-weight: 700;
}

.feedback-overlay .content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}

.feedback-top p {
  font-size: 18px;
  font-family: "Source Sans Pro", sans-serif;
  color: #6D7188;
  margin-top: 30px;
}
</style>