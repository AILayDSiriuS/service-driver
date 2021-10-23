<template>
  <div id="temporarily-not-available-page">
    <Header/>
    <Aside/>
    <div class="container">
      <div class="section first">
        <div class="no-available col-12">
          <img src="@/assets/illustrations/no-available.svg" alt="No Results">
          <span>Страница пока недоступна, но мы работаем над этим.</span>
          <Button isLink="false" @action="toHome" textContent="На главную" color="btn-b margin-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Temp',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
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
    toHome: function () {
      this.$router.push({ name: 'Home'})
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Button: () => import('@/components/Buttons/Button'),
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

.no-available {
  margin-top: 90px;
  display: flex;
  flex-flow:column nowrap;
  align-items: center;
}

.no-available img {
  height: 246px;
}

.no-available span {
  margin-top: 45px;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #6D7188;
}

.margin-btn {
  margin-top: 40px;
}
</style>
