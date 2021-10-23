<template>
  <div id="me-page">
    <Header/>
    <Aside active="Главная"/>
    <div class="container">
      <div class="row section first">
        <div class="col-12 profile-header">
          <div class="profile-header__left">
            <div class="profile-picture"></div>
            <div class="profile-name">
              <h3>{{ name }}</h3>
              <span>USER</span>
            </div>
          </div>
          <div class="profile-header__right">
            <Button isLink="true" link="/" textContent="Редактировать профиль" color="btn-b" />
          </div>
        </div>
      </div>
      <div class="row section first" v-if="friends.length > 0">
        <div class="col-12 profile-friends">
          <div class="profile-friends__topic">
            <h4>Друзья</h4>
            <span>Показать всех</span>
          </div>
          <div class="profile-friends__body">
            <ProfileFriend v-for="friend in friends" :key="friend.id" :data="friend"/>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Me',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
          name: '',
          friends: ''
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
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Aside: () => import('@/components/Aside.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Button: () => import('@/components/Buttons/Button.vue'),
    ProfileFriend: () => import('@/components/Blocks/ProfileFriend.vue')
  }
}
</script>

<style scoped>
.profile-header {
  padding: 30px;
  background: #FFFFFF;
  border: 2px solid #EEEDF3;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
}
.profile-picture {
  height: 106px;
  width: 106px;
  background: url('../assets/illustrations/user.jpg');
  background-size: cover;
  border-radius: 41px;
}

.profile-name {
  margin-left: 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.profile-name h3 {
  font-size: 22px;
  font-weight: 600;
  color: #3B405C;
  margin: 0;
}

.profile-name span {
  margin-top: 8px;
  font-size: 18px;
  color: #C0BFD3;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
}

.profile-friends {
  margin: 0;
  padding: 0;
}

.profile-friends__topic {
  padding: 12px 30px;
  background: #fff;
  border-radius: 7px 7px 0 0;
  border: 2px solid #EEEDF3;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.profile-friends__topic h4 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #3B405C;
}

.profile-friends__topic span {
  color: #9677F1;
  font-weight: 700;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
}

.profile-friends__body {
  background: #fff;
  border: 2px solid #EEEDF3;
  border-top: none;
  border-radius: 0 0 7px 7px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 30px;
  gap: 22px;
}

.footer {
  position: absolute;
  bottom: 0px;
}

.profile-header__left {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

</style>
