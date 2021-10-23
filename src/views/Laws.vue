<template>
  <div id="laws-page">
    <TempOverlay @close="closeOverlay" v-if="isConfirm" />
    <Header/>
    <Aside active="Справочник"/>
    <div class="container">
      <div class="row section first">
        <Hint title="Сайт находится в режиме бета-тестирования" description="Если вы обнаружили ошибку на сайте, пожалуйста, сообщите нам об этом." />
      </div>
      <div class="row">
        <Law/>
        <Law/>
        <Law/>
        <Law/>
        <Law/>
        <Law/>
        <Law/>
        <Law/>
        <Law/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Laws',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
          isConfirm: true
        }
      },
  beforeMount: async function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
    } else {
      this.$router.push({ name: 'Signin' });
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
    closeOverlay: function () {
      this.isConfirm = false;
    }
  },
  async mounted() {

  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Hint: () => import('@/components/Blocks/Hint.vue'),
    Aside: () => import('@/components/Aside.vue'),
    TempOverlay: () => import('@/components/Overlay/Temp.vue'),
    Law: () => import('@/components/Blocks/Law.vue')
  }
}
</script>

<style>

</style>
