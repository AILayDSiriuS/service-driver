<template>
  <div id="search-page">
    <Header ref="header" />
    <Aside active="Главная"/>
    <div class="container">
      <Hint class="section first" title="Тестовый режим" description="В настоящее время функция поиска работает только среди пользователей." />
      <div class="col-12 search-page section first">
        <div class="first">
          <router-link to="/">
            <span class="prev-page">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
            </svg>
              ГЛАВНАЯ
            </span>
          </router-link>
          <h3 v-if="query != undefined">Результаты поиска по запросу «<span class="query-span">{{ query }}</span>»</h3>
          <h3 v-if="query == undefined">Список всех пользователей платформы</h3>
          <div class="first">
            <User v-for="user in found_users" :key="user.id" :data="user" />
            <div class="no-result col-12" v-if="found_users.length == 0 && query != undefined">
              <img src="@/assets/illustrations/no-result.svg" alt="No Results">
              <span>К сожалению, по вашему запросу ничего не найдено</span>
              <Button isLink="false" @action="openSearch" textContent="Искать еще" color="btn-b margin-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
          query: this.$route.params['query'],
          users: []
        }
      },
  beforeMount: function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
      this.getUsersList(token)
    } else {
      this.$router.push({ name: 'Signin' });
    }
  },
  computed: {
    found_users: function () {
      let users_filtered = [];
      if(this.query != undefined) {
        for(let i = 0; i < this.users.length; i++) {
          if(this.users[i].first_name == this.query || this.users[i].last_name == this.query || this.users[i].first_name.toLowerCase() == this.query || this.users[i].last_name.toLowerCase() == this.query || this.users[i].username == this.query) {
            users_filtered.push(this.users[i]);
          }
        }
      }
      if(this.query == undefined) {
        for(let i = 0; i < this.users.length; i++) {
          if(this.users[i].first_name != '' && this.users[i].last_name != '') {
            users_filtered.push(this.users[i]);
          }
        }
      }
      return users_filtered;
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
    getUsersList: function(token) {
    //  http://95.214.62.187/api/v1/main/users/
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://95.214.62.187/api/v1/main/users/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            this.users = res.data.data;
            this.doSearch();
          })
          .catch(error => console.log('error', error));
    },
    openSearch: function() {
      this.$refs.header.showSearchOverlay();
    }
  },
  watch: {
    $route(toRoute) {
      this.query = toRoute.params['query']
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Aside: () => import('@/components/Aside.vue'),
    Hint: () => import('@/components/Blocks/Hint.vue'),
    User: () => import('@/components/Blocks/User.vue'),
    Button: () => import('@/components/Buttons/Button'),
    Footer: () => import('@/components/Footer.vue')
  }
}
</script>

<style scoped>
  .prev-page {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #C0BFD3;
  }

  .search-page h3 {
    font-size: 22px;
    font-weight: 600;
    color: #3B405C;
  }

  .prev-page svg {
    height: 10px;
  }

  .router-link-active {
    color: #C0BFD3;
  }

  .query-span {
    color: #9677F1;
  }

  .no-result {
    margin-top: 90px;
    display: flex;
    flex-flow:column nowrap;
    align-items: center;
  }

  .no-result img {
    height: 246px;
  }

  .no-result span {
    margin-top: 45px;
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #6D7188;
  }

  .margin-btn {
    margin-top: 40px;
  }
</style>
