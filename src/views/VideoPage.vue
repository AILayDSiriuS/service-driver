<template>
  <div id="article-page">
    <Header/>
    <Aside active="Главная"/>
    <div class="container">
      <div class="row first">
        <div class="col-10 offset-1 video-page">
          <router-link to="/">
            <span class="prev-page">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
            </svg>
              PREVIOUS PAGE
            </span>
          </router-link>
          <iframe
              width="100%" height="520"
              :src="content.video + '?autoplay=1'"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
          <h3>{{ content.name }}</h3>
          <div class="tags">
            <span>75 VIEWS</span>
            <span>•</span>
            <span>{{ time }} DAYS AGO</span>
          </div>
          <hr>
          <p class="video-description">In nec nunc quis sem hendrerit euismod. Curabitur purus turpis, sollicitudin porttitor tempus interdum, molestie vitae sapien. Proin dictum, ex in molestie blandit, ligula magna facilisis magna, et ullamcorper augue est ut erat. Nullam tempor dolor et velit fringilla, eget luctus diam elementum. Aenean mattis justo quam, vitae sollicitudin nunc maximus quis. Fusce consequat libero magna, ac sagittis ex finibus ac. Vestibulum elit odio, laoreet eu finibus sit amet, gravida tincidunt orci. Morbi egestas leo nec hendrerit fermentum. Duis porta nulla quis erat ultrices venenatis.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'VideoPage',
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
      'VIDEOS'
    ]),
    time() {
      let date1 = new Date(this.content.created_at);
      let date2 = new Date();
      return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    },
  },
  methods: {
    ...mapActions([
      'GET_VIDEOS_FROM_API'
    ]),
    getContent(){
      this.content = this.VIDEOS.data.data.data[this.id - 1];
      console.log(this.content)
    }
  },
  async mounted() {
    await this.GET_VIDEOS_FROM_API();
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
  .video-page h3 {
    margin-top: 45px;
    font-size: 22px;
    font-weight: 600;
    color: #3B405C;
  }

  .video-page iframe {
    margin-top: 30px;
  }

  .pull-right {
    float: right;
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

  .tags span {
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

  .video-page hr {
    border-color: #EEEDF3;
  }

  .video-description {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 18px;
    color: #6D7188;
    line-height: 30px;
  }

  .prev-page {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 600;
  }
</style>
