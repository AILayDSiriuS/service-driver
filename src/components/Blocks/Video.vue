<template>
    <div class="video col-3">
      <!-- Когда будет готова серверная часть - router-link to "`/videos/${data.id}`" -->
      <router-link :to="`/videos/${this.data.id}`">
            <div class="preview" :style="previewImage">
                <img class="play-button" src="../../assets/icons/Video.svg" alt="">
                <div class="video-length">
                    5:00
                </div>
            </div>
            <div class="text-content">
                <h3>{{ data.name }}</h3>
                <div class="tags">
<!--                    <span>75 VIEWS</span>-->
<!--                    <span>•</span>-->
                    <span>{{ time }} DAYS AGO</span>
                </div>
            </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Video',
        computed: {
          time() {
            let date1 = new Date(this.data.created_at);
            let date2 = new Date();
            return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
          },
          previewImage() {
            let url = `http://img.youtube.com/vi/${this.data.video.substr(30)}/mqdefault.jpg`;
            return "background: url(" + url + "); background-size: cover;"
          }
        },
        props: {
          data: {
            type: Object,
            default() {
              return {}
            }
          }
        },
    }
</script>


<style>
    .video {
        margin-top: 46px;
    }

    .video .preview {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        transition: 0.25s ease-in-out;
        height: 152px;
        border-radius: 7px;
        background: #fff;
    }
    .video:hover .preview {
        transform: translateY(-4px);
        -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.03);
    }
    .video .text-content {
        margin-top: 16px;
    }

    .video h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #3B405C;
    }

    .video span {
        margin-left: 8px;
        font-family: "Source Sans Pro", sans-serif;
        font-family: 16px;
        font-weight: 600;
        color: #C0BFD3;
    }

    .video span:first-child {
        margin-left: 0;
    }

    .video .tags {
        display: flex;
        flex-flow: row nowrap;
    }

    .video .play-button {
        z-index: 5;
    }

    .video-length {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        background: rgba(59,64,92, 0.5);
        position: absolute;
        bottom: 8px;
        right: 8px;
        color: #fff;
        width: 42px;
        height: 18px;
        font-size: 14px;
        font-weight: 600;
        font-family: "Source Sans Pro", sans-serif;
    }
</style>