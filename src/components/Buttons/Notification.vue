<template>
        <div class="notification-menu">
          <div class="triangle"></div>
          <span class="no-notifications" v-if="requests.length == 0">Уведомлений пока нет</span>
          <FriendRequest v-for="request in requests" :key="request.id" :data="request"/>
        </div>
</template>

<script>
    export default {
      name: 'NotificationMenu',
      data: function () {
        return {
          requests: ''
        }
      },
      beforeMount() {
        if(document.cookie) {
          let cookie = document.cookie,
              token = cookie.replace(/token=/g, '');
          this.getFriendRequests(token);
        }
      },
      methods: {
        getFriendRequests: function (token) {
          let myHeaders = new Headers();
          myHeaders.append("Authorization", `Token ${token}`);

          let requestOptions = {
            method: 'GET',
            headers: myHeaders
          }

          fetch("http://95.214.62.187/api/v1/main/friendship/friend_requests/me/", requestOptions)
              .then(response => response.text())
              .then(result => {
                let res = JSON.parse(result);
                this.requests = res.data.data;
              })
              .catch(error => console.log('error', error));
        }
      },
      components: {
        FriendRequest: () => import('@/components/Blocks/FriendRequest.vue')
      }
    }
</script>

<style scoped>
  .notification-menu {
    position: absolute;
    top: 80px;
    left: -155px;
    width: 370px !important;
    height: auto !important;
    background:#fff;
    border: 2px solid #EEEDF3;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 7px;
    z-index: 100;
  }

  .notification-menu::after {
    content: '';
    position: absolute;
    right: calc(100% / 2 - 10px);
    top: -20px;
    border: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }

  .no-notifications {
    padding: 45px 0;
    text-align: center;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #C0BFD3;
  }

  .triangle {
    content: '';
    position: absolute;
    right: calc(100% / 2 - 14px);
    top: -28px;
    border: 14px solid transparent;
    border-bottom: 14px solid #EEEDF3;
    z-index: -1;
  }
</style>