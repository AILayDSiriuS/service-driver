<template>
    <div class="article col">
        <!-- Когда будет готова серверная часть - router-link :to "`/articles/${data.id}`" -->
        <router-link :to="`/articles/${this.id}`">
          <div class="row">
            <div class="preview" :style="image"></div>
            <div class="text-content">
              <h3>{{ data.post_title }}</h3>
              <span>{{ time }} DAYS AGO</span>
            </div>
          </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'ArticleMini',
        computed: {
            image() {
              return 'background: url(' + 'https://source.unsplash.com/1600x900/?mountains' + '); background-size: cover;';
            },
            time() {
              let date1 = new Date(this.data.date);
              let date2 = new Date();
              return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            }
        },
        props: {
            data: {
                type: Object,
                default() {
                return {}
                }
            },
            id: Number
        }
    }
</script>


<style scoped>
    .article:hover .preview {
        transform: translateY(-4px);
        -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.03);
    }

    .article {
        margin-top: 32px;
    }

    .article .preview {
        background: #fff;
        height: 95px;
        width: 168px;
        border-radius: 7px;
        transition: 0.25s ease-in-out;
    }

    .article .text-content {
        margin-left: 16px;
    }

    .article h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #3B405C;
        width: 300px;
    }

    .article span {
        font-family: "Source Sans Pro", sans-serif;
        font-family: 16px;
        font-weight: 600;
        color: #C0BFD3;
    }
</style>