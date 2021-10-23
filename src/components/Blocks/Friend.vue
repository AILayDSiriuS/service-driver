<template>
    <div class="col-4">
      <router-link class="friend" :to="'/users/' + data.id">
        <div class="preview"></div>
        <h3>{{data.first_name}} {{data.last_name}}</h3>
      </router-link>
        <!-- Когда будет готова серверная часть - router-link :to "`/laws/${data.id}`" -->

    </div>
</template>

<script>
    export default {
      name: 'Friend',
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
    .friend {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-top: 45px;
      padding: 30px;
      transition: 0.15s ease-in-out;
      border-radius: 18px;
    }

    .friend:hover {
      background: rgba(0,0,0,0.02)
    }

    .friend .preview {
      height: 74px;
      width: 74px;
      border-radius: 29px;
      background: url('../../assets/illustrations/user.jpg');
      background-size: cover;
    }

    .friend h3 {
      font-family: "Montserrat", sans-serif;
      margin-left: 30px;
      margin-bottom: 0;
      font-size: 18px;
      font-weight: 600;
      width: 150px;
      color: #3B405C;
      text-align: left;
      line-height: 25px;
    }
</style>