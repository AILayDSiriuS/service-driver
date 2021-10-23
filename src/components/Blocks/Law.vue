<template>
    <div class="law col-4">
        <!-- Когда будет готова серверная часть - router-link :to "`/laws/${data.id}`" -->
        <div class="preview" :style="image"></div>
        <div class="text-content">
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            <span>128 Articles</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Law',
        computed: {
            image() {
                return 'background: url(' + 'https://source.unsplash.com/1600x900/?mountains' + '); background-size: cover;';
            },
            time() {
              let date1 = new Date(this.data.date);
              let date2 = new Date();
              return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            }
        }
    }
</script>


<style>
    .law {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 45px;
    }

    .law .preview {
      height: 95px;
      width: 95px;
      border-radius: 7px;
    }

    .law .text-content {
      width: 200px;
      margin-left: 16px;
    }

    .law h3 {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #3B405C;
      margin: 0;
    }

    .law span {
      font-family: "Source Sans Pro", sans-serif;
      font-family: 16px;
      font-weight: 600;
      color: #C0BFD3;
    }
</style>