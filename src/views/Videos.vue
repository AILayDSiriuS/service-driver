<template>
  <div id="articles-page">
    <Header/>
    <Aside active="Главная"/>
    <div class="container">
      <div class="section first">
        <router-link to="/">
          <span class="prev-page">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
          </svg>
            PREVIOUS PAGE
          </span>
        </router-link>
        <h3>Видео</h3>
      </div>
      <div class="row">
        <Video v-for="video in VIDEOS.data.data.data" :key="video.id" :data="video"/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Videos',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: ''
        }
      },
  beforeMount: function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
    } else {
      this.$router.push({ name: 'Signin' });
    }
  },
  computed: {
    ...mapGetters([
      'VIDEOS'
    ])
  },
  methods: {
    getData: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://95.214.62.187/auth/me/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let profileData = JSON.parse(result);
            this.type = profileData.data.type;
            this.id = profileData.data.id;
            this.username = profileData.data.attributes.username;
            this.email = profileData.data.attributes.email;
          })
          .catch(error => console.log('error', error));
    },
    ...mapActions([
      'GET_VIDEOS_FROM_API'
    ])
  },
  mounted() {
    this.GET_VIDEOS_FROM_API();
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Video: () => import('@/components/Blocks/Video.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Aside: () => import('@/components/Aside.vue')
  }
}
</script>

<style scoped>
#articles-page h3 {
  font-weight: 700;
  font-size: 32px;
  color: #3B405C
}

.prev-page svg {
  height: 10px;
}

.prev-page {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.router-link-active {
  color: #C0BFD3;
}
</style>