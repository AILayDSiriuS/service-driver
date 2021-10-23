<template>
  <div id="article-page">
    <Header/>
    <Aside active="Главная"/>
    <div class="container">
      <div class="row first">
        <div class="article-page col-8 offset-2">
          <router-link to="/">
            <span class="prev-page">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
            </svg>
              PREVIOUS PAGE
            </span>
          </router-link>
          <h3>{{ content.post_title }}</h3>
          <div class="preview-image" :style="image"></div>
          <div class="tags">
            <span>{{ time }} DAYS AGO</span>
          </div>
          <hr>
          <p class="post-text">{{ content.post_text }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ArticlePage',
  data: function () {
    return {
      id: this.$route.params['id'],
      content: Object
    }
  },
  watch: {
    $route(toRoute) {
      this.id = toRoute.params['id']
    }
  },
  computed: {
    ...mapGetters([
      'ARTICLES'
    ]),
    image() {
      return 'background: url(' + 'https://source.unsplash.com/1600x900/?mountains' + '); background-size: cover;';
    },
    time() {
      let date1 = new Date(this.content.date);
      let date2 = new Date();
      return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    }
  },
  methods: {
    ...mapActions([
      'GET_ARTICLES_FROM_API'
    ]),
    getContent(){
      this.content = this.ARTICLES.data.data.data[this.id];
      console.log(this.content)
    }
  },
  async mounted() {
    await this.GET_ARTICLES_FROM_API();
    await this.getContent();
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Aside: () => import('@/components/Aside.vue')
  }
}
</script>

<style scoped>
  .preview-image {
    margin-top: 16px;
    background: #fff;
    width: 100%;
    height: 377px;
    border-radius: 7px;
  }
  .pull-right {
    float: right;
  }

  .article-page h3 {
    font-weight: 700;
    font-size: 32px;
    color: #3B405C
  }

  #article-page h4 {
    font-weight: 600;
    font-size: 22px;
    color: #3B405C;
    margin-top: 81px;
  }

  #article-page span {
    font-family: "Source Sans Pro", sans-serif;
    font-family: 16px;
    font-weight: 600;
    color: #C0BFD3;
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

  .post-text {
    font-size: 18px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    color: #6D7188;
    line-height: 30px;
    text-align: justify ;
  }

  .tags span {
    margin-top: 16px;
    margin-left: 8px;
    font-family: "Source Sans Pro", sans-serif;
    font-family: 16px;
    font-weight: 600;
    color: #C0BFD3;
  }

  .tags span:first-child {
    margin-left: 0;
  }

  .tags {
    display: flex;
    flex-flow: row nowrap;
  }

  .article-page hr {
    border-color: #EEEDF3;
  }
</style>
