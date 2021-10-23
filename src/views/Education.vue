<template>
  <div id="education-page">
    <Header/>
    <Aside active="Обучение"/>
    <div class="container">
      <div class="row section first">
        <Hint title="Сайт находится в режиме бета-тестирования" description="Если вы обнаружили ошибку на сайте, пожалуйста, сообщите нам об этом." />
      </div>


      <div class="row section">
        <div class="section-title col">      
          <h2>Обязательные тесты</h2>
        </div>
      </div>
      <div class="row">
        <Exam v-for="exam in exams" :key="exam.id" :data="exam"/>
      </div>
      

      <div class="row section">
        <div class="section-title col-10">
          <h2>Тренировочные тесты</h2>
        </div>
        <div class="col-2">
          <Button isLink="true" link="/education" textContent="Подробнее" color="btn-outline-blue" />
        </div>
      </div>
      <div class="row">
        <Test v-for="test in trainings" :key="test.id" :data="test"/>
      </div>


      <div class="row section">
        <div class="section-title col-10">
          <h2>Статьи</h2>
        </div>
        <div class="col-2">
          <Button isLink="true" link="/articles" textContent="Подробнее" color="btn-outline-blue" />
        </div>
      </div>
      <div class="row">
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
      <div class="row">
        <Video v-for="video in videos" :key="video.id" :data="video"/>
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
  name: 'Education',
  data: 
    function () {
      return {
        id: '',
        email: '',
        username: '',
        trainings: [],
        exams: [],
        limit: 8
    }
  },
  beforeMount: async function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
      await this.getDataFromDB();
    } else {
      this.$router.push({ name: 'Signin' });
    }
  },
  computed: {
    ...mapGetters([
      'TESTS', 'ARTICLES', 'VIDEOS'
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
    getDataFromDB: async function() {
      await this.GET_TESTS_FROM_API();
      await this.GET_ARTICLES_FROM_API();
      await this.GET_VIDEOS_FROM_API();
      this.trainings = this.TESTS.data.data.data.filter(test => test.category_id == 1);
      this.exams = this.TESTS.data.data.data.filter(test => test.category_id == 2);
    },
    ...mapActions([
      'GET_TESTS_FROM_API', 'GET_ARTICLES_FROM_API', 'GET_VIDEOS_FROM_API'
    ])
  },
  async mounted() {
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Article: () => import('@/components/Blocks/Article.vue'),
    Video: () => import('@/components/Blocks/Video.vue'),
    Playlist: () => import('@/components/Blocks/Playlist.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Button: () => import('@/components/Buttons/Button'),
    Test: () => import('@/components/Blocks/Test.vue'),
    Exam: () => import('@/components/Blocks/Exam.vue'),
    Hint: () => import('@/components/Blocks/Hint.vue'),
    Aside: () => import('@/components/Aside.vue')
  }
}
</script>

<style>
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
