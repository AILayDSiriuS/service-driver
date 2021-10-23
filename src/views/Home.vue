<template>
  <div id="home-page">
    <Header/>
    <Aside active="Главная"/>
    <div class="container">
      <div class="row section first">
        <div class="section-title col">
          <h2>Быстрый доступ</h2>
        </div>
      </div>
      <div class="row">
        <QuickButton title="Избранное" href="#"/>
        <QuickButton title="Друзья" href="/friends"/>
        <QuickButton title="Обучение" href="/education"/>
        <QuickButton title="Статистика" href="#"/>
      </div>
      <div class="row section">
        <div class="section-title col-10">
          <h2>Статьи</h2>
        </div>
        <div class="col-2">
          <Button isLink="true" link="/articles" textContent="Подробнее" color="btn-outline-blue" />
        </div>
      </div>
      <div class="row" v-if="isArticlesLoaded">
        <Article v-for="(article, index) in articles" :key="article.id" :data="article" :id="index"/>
      </div>
      <div class="row section">
        <div class="section-title col-10">
          <h2>Видео</h2>
        </div>
        <div class="col-2">
          <Button isLink="true" link="/videos" textContent="Подробнее" color="btn-outline-blue" />
        </div>
      </div>
      <div class="row" v-if="isVideoLoaded">
        <Video v-for="video in videos" :key="video.id" :data="video" />
      </div>
      <div class="row section">
        <div class="section-title col-10">      
          <h2>Плейлисты</h2>
        </div>
        <div class="col-2">
          <Button isLink="true" link="/playlists" textContent="Подробнее" color="btn-outline-blue" />
        </div>
      </div>
      <div class="row">
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Второй плейлист" date="3" count="5" link="#" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Main',
  data: 
    function () {
      return {
        id: '',
        email: '',
        username: '',
        limit: 8,
        isArticlesLoaded: '',
        isVideoLoaded: ''
    }
  },
  beforeMount: async function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      await this.getData(token);
    } else {
      this.$router.push({ name: 'Signin' });
    }
  },
  computed: {
      ...mapGetters([
        'ARTICLES', 'VIDEOS'
      ]),
      videos: function () {
        let videos = this.VIDEOS.data.data.data.slice(0, this.limit);
        return videos;
      },
      articles: function () {
        let articles = this.ARTICLES.data.data.data.slice(0, this.limit);
        return articles;
      }
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
      'GET_ARTICLES_FROM_API', 'GET_VIDEOS_FROM_API'
    ])
  },
  async mounted() {
    await this.GET_ARTICLES_FROM_API();
    await this.GET_VIDEOS_FROM_API();
    this.isArticlesLoaded = true;
    this.isVideoLoaded = true;
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Article: () => import('@/components/Blocks/Article.vue'),
    Video: () => import('@/components/Blocks/Video.vue'),
    Playlist: () => import('@/components/Blocks/Playlist.vue'),
    Footer: () => import('@/components/Footer.vue'),
    QuickButton: () => import('@/components/Buttons/QuickButton'),
    Button: () => import('@/components/Buttons/Button'),
    Aside: () => import('@/components/Aside.vue')
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .preview {
    cursor: pointer;
  }

  .blue {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    height: 54px;
    border-radius: 7px;
    background: #9677F1;
  }
</style>