<template>
  <div id="friends-page">
    <Header ref="header" />
    <Aside active="Главная"/>
    <div class="container">
      <div class="section first">
        <router-link to="/">
            <span class="prev-page">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
            </svg>
              PREVIOUS PAGE
            </span>
        </router-link>
        <h3>Друзья</h3>
      </div>
      <div class="row">
        <div class="no-friends col-12" v-if="isFriendListEmpty">
          <img src="@/assets/illustrations/no-friends.svg" alt="No Results">
          <span>Ваш список друзей пуст. Пора это исправить!</span>
          <Button isLink="false" @action="openSearch" textContent="Искать друзей" color="btn-b margin-btn" />
        </div>
        <Friend v-for="friend in friends" :key="friend.id" :data="friend"/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Friends',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
          name: '',
          friends: Array,
          isFriendListEmpty: true
        }
      },
  beforeMount: function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
      this.getFriends(token);
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
            this.getUser(token);
          })
          .catch(error => console.log('error', error));
    },
    getUser: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.id);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/users/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let userData = JSON.parse(result);
            console.log(userData);
            this.name = `${userData.data.data[0].first_name} ${userData.data.data[0].last_name}`;
          })
          .catch(error => console.log('error', error));
    },
    getFriends: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://95.214.62.187/api/v1/main/friendship/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let friends = JSON.parse(result);
            this.friends = friends.data.data;
            if(this.friends.length != 0) {
              this.isFriendListEmpty = false;
            }
          })
          .catch(error => console.log('error', error));
    },
    openSearch: function() {
      this.$refs.header.showSearchOverlay();
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Aside: () => import('@/components/Aside.vue'),
    Friend: () => import('@/components/Blocks/Friend.vue'),
    Button: () => import('@/components/Buttons/Button'),
    Footer: () => import('@/components/Footer.vue')
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0px;
}

#friends-page h3 {
  font-weight: 700;
  font-size: 32px;
  color: #3B405C
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

.no-friends {
  margin-top: 90px;
  display: flex;
  flex-flow:column nowrap;
  align-items: center;
}

.no-friends img {
  height: 246px;
}

.no-friends span {
  margin-top: 45px;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #6D7188;
}

.margin-btn {
  margin-top: 40px;
}

.search-overlay {
  width: 770px;
  height: 84px;
  position: relative;
  z-index: 100;
  margin: auto;
  top: 25px; left: 0; bottom: 0; right: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  transform: scale(0.75)
}

.search-field {
  background: #fff;
  padding: 22px 40px;
  width: 100%;
  height: 100%;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 28px;
  font-weight: 400;
  border-radius: 30px;
  color: #3B405C;
}

.search-field {
  border: none;
  outline: none;
}

.search-field:focus {
  border: none;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 40px;
  top: 30px;
  z-index: 150;
  cursor: pointer;
}

.search-icon img {
  width: 24px;
  height: 24px;
}
</style>
