<template>
  <div class="user-block">
    <router-link :to="'/users/' + data.id">
      <div class="user-data">
        <div class="user-picture">
        </div>
        <h4>{{data.first_name}} {{data.last_name}}</h4>
      </div>
    </router-link>

    <Button isLink="false" @action="sendFriendRequest" textContent="Добавить в друзья" color="btn-b" v-if="!isRequestSend && !isFriend && isNotYou"/>
    <Button isLink="false" textContent="Заявка отправлена" color="btn-b btn-disabled" v-if="isRequestSend && !isFriend"/>
    <Button isLink="false" textContent="Удалить из друзей" color="btn-g" v-if="isFriend"/>

  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    id: Number
  },
  data: function () {
    return {
      isRequestSend: false,
      isFriend: false,
      requests: '',
      friends: '',
      userFriends: '',
      myId: ''
    }
  },
  async beforeMount() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      await this.getData(token);
      await this.checkRequestState(token);
      await this.checkFriendState(token);
      this.getFriends(token);
    } else {
      this.$router.push({ name: 'Signin' });
    }
  },
  components: {
    Button: () => import('@/components/Buttons/Button.vue')
  },
  computed: {
    isNotYou: function() {
      if(this.myId != this.data.id) {
        return true;
      } else {
        return false;
      }
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
            this.myId = parseInt(profileData.data.id);
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
      urlencoded.append("friend_id", this.data.id);

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
            let reqId = this.requests.find(request => request.to_user == this.data.id);
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
            let reqId = this.friends.find(request => request.id == this.data.id);
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

      fetch(`http://95.214.62.187/api/v1/main/friendship/friends/${this.data.id}`, requestOptions)
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
  }
}
</script>


<style scoped>
  .user-block {
    margin-top: 15px;
    padding: 30px;
    width: 100%;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 7px;
  }

  .user-block:first-child {
    margin-top: 0;
  }

  .user-data {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .user-data h4 {
    margin-left: 30px;
    font-size: 18px;
    font-weight: 600;
    color: #3B405C;
  }

  .user-picture {
    background: url('../../assets/illustrations/user.jpg');
    background-size: cover;
    border-radius: 29px;
    height: 74px;
    width: 74px;
  }
</style>