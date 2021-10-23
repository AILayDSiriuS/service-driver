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
              <h3>{{ user.username }}</h3>
              <span>USER</span>
            </div>
          </div>
          <div class="profile-header__right">
            <Button isLink="true" link="/" textContent="Сообщение" color="btn-b" style="margin-right: 30px;" />
            <Button isLink="false" @action="sendFriendRequest" textContent="Добавить в друзья" color="btn-b" v-if="!isRequestSend && !isFriend"/>
            <Button isLink="false" textContent="Заявка отправлена" color="btn-b btn-disabled" v-if="isRequestSend && !isFriend"/>
            <Button isLink="false" textContent="Удалить из друзей" color="btn-g" v-if="isFriend"/>
          </div>
        </div>
      </div>
      <div class="row section first" v-if="userFriends.length > 0">
        <div class="col-12 profile-friends">
          <div class="profile-friends__topic">
            <h4>Друзья</h4>
            <span>Показать всех</span>
          </div>
          <div class="profile-friends__body">
            <ProfileFriend v-for="friend in userFriends" :key="friend.id" :data="friend"/>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'User',
  data:
      function () {
        return {
          id: '',
          email: '',
          username: '',
          uid: this.$route.params['id'],
          user: {
            id: '',
            username: ''
          },
          isRequestSend: false,
          isFriend: false,
          requests: '',
          friends: '',
          userFriends: ''
        }
      },
  beforeMount: async function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      await this.getData(token);
      await this.getUser(token);
      await this.checkRequestState(token);
      await this.checkFriendState(token);
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
          })
          .catch(error => console.log('error', error));
    },
    getUser: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.uid);

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
          this.user.username = `${userData.data.data[0].first_name} ${userData.data.data[0].last_name}`;
          this.user.id = userData.data.data[0].id;
          if(this.id == this.uid) {
            console.log('а ну брысь')
            this.$router.push('/me');
          }
        })
        .catch(error => console.log('error', error));
    },
    sendFriendRequest: function() {
      let token;
      if(document.cookie) {
        let cookie = document.cookie;
        token = cookie.replace(/token=/g, '');
      } else {
        this.$router.push({ name: 'Signin' });
      }
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("friend_id", this.uid);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/friendship/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            console.log(res);
            this.isRequestSend = true;
          })
          .catch(error => console.log('error', error));
    },
    checkRequestState: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
      }

      fetch("http://95.214.62.187/api/v1/main/friendship/friend_requests/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let requests = JSON.parse(result);
            this.requests = requests.data.data;
            let reqId = this.requests.find(request => request.to_user == this.user.id);
            if(reqId != undefined) {
              this.isRequestSend = true;
            }
          })
          .catch(error => console.log('error', error));
    },
    checkFriendState: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
      }

      fetch("http://95.214.62.187/api/v1/main/friendship/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let friends = JSON.parse(result);
            this.friends = friends.data.data;
            let reqId = this.friends.find(request => request.id == this.user.id);
            if(reqId != undefined) {
              this.isFriend = true;
            }
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

      fetch(`http://95.214.62.187/api/v1/main/friendship/friends/${this.uid}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            let friends = JSON.parse(result);
            this.userFriends = friends.data.data;
            if(this.friends.length != 0) {
              this.isFriendListEmpty = false;
            }
          })
          .catch(error => console.log('error', error));
    }
  },
  watch: {
    $route(toRoute) {
      this.uid = toRoute.params['id']
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Aside: () => import('@/components/Aside.vue'),
    Footer: () => import('@/components/Footer.vue'),
    ProfileFriend: () => import('@/components/Blocks/ProfileFriend.vue'),
    Button: () => import('@/components/Buttons/Button.vue')
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
