<template>
    <div class="playlist col-3">
      <!-- Когда будет готова серверная часть - router-link to "`/playlists/${data.id}`" -->
      <router-link to="/temp">
        <div class="preview" :style="image">
          <img class="playlist-button" src="../../assets/icons/Playlist.svg" alt="">
        </div>
        <div class="text-content">
          <h3>Плейлист</h3>
          <div class="tags">
            <span>5 VIDEOS</span>
            <span>•</span>
            <span>10 DAYS AGO</span>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Playlist',
        computed: {
          image() {
            return 'background: url(' + 'https://source.unsplash.com/1600x900/?mountains' + '); background-size: cover;';
          }
        }
    }
</script>


<style>
    .playlist {
        margin-top: 46px;
    }

    .playlist .preview {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        transition: 0.25s ease-in-out;
        height: 152px;
        border-radius: 7px;
        background: #fff;
    }

    .playlist:hover .preview {
        transform: translateY(-4px);
        -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.03);
    }

    .playlist .text-content {
        margin-top: 16px;
    }

    .playlist h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #3B405C;
    }

    .playlist span {
        margin-left: 8px;
        font-family: "Source Sans Pro", sans-serif;
        font-family: 16px;
        font-weight: 600;
        color: #C0BFD3;
    }

    .playlist span:first-child {
        margin-left: 0;
    }

    .playlist .tags {
        display: flex;
        flex-flow: row nowrap;
    }

    .playlist .playlist-button {
        z-index: 5;
    }
</style>