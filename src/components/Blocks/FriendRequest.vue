<template>
  <div class="friend-request">
    <div class="user-picture"></div>
    <div class="notification-content">
      <h4>Запрос в друзья</h4>
      <span>Пользователь {{ user.first_name }} {{ user.last_name }} хочет добавить Вас в друзья.</span>
      <div class="request-actions">
        <button @click="denyRequest" v-if="isWaitingAnswer">Отклонить</button>
        <button @click="acceptRequest" v-if="isWaitingAnswer">Принять</button>
        <span v-if="!isWaitingAnswer">Заявка была {{ answer }}!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendRequest",
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data: function () {
    return {
      user: '',
      isWaitingAnswer: true,
      answer: ''
    }
  },
  beforeMount() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getUser(token);
    }
  },
  methods: {
    getUser: function (token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.data.from_user);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/users/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            this.user = res.data.data[0];
          })
          .catch(error => console.log('error', error));
    },
    denyRequest: function () {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("friend_id", this.data.from_user);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/friendship/friend_requests/reject/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            console.log(res)
            this.isWaitingAnswer = false;
            this.answer = 'отклонена'
          })
          .catch(error => console.log('error', error));
    },
    acceptRequest: function () {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let urlencoded = new URLSearchParams();
      urlencoded.append("friend_id", this.data.from_user);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      }

      fetch("http://95.214.62.187/api/v1/main/friendship/friend_requests/accept/", requestOptions)
          .then(response => response.text())
          .then(result => {
            let res = JSON.parse(result);
            console.log(res)
            this.isWaitingAnswer = false;
            this.answer = 'принята'
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>
  .friend-request {
    height: auto;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 20px;
  }

  .friend-request .user-picture {
    width: 40px;
    height: 40px;
    background: url('../../assets/illustrations/user.jpg');
    background-size: cover;
    border-radius: 16px;
  }

  .notification-content {
    margin-left: 20px;
    display: flex;
    flex-flow: column nowrap;
    width: 270px;
  }

  .notification-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #3B405C;
  }

  .notification-content span {
    margin-top: 8px;
    font-size: 18px;
    font-family: "Source Sans Pro", sans-serif;
    color: #6D7188;
    line-height: 24px;
  }

  .request-actions {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .request-actions button {
    width: 125px;
    height: 40px;
    color: #fff;
    background: #9677F1;
    border: none;
    outline: none;
    border-radius: 7px;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 700;
  }

  .request-actions button:first-child {
    color: #9677F1;
    border: 2px solid #9677F1;
    background: none;
  }
</style>