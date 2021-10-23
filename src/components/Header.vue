<template>
    <div class="header">
      <transition name="fade">
        <SearchOverlay v-show="isSearchOverlayVisible" @close="closeSearchOverlay" />
      </transition>
      <router-link to="/">
        <div class="logo">
          <h2>ServiceDriver</h2>
        </div>
      </router-link>
		<div class="profile">
			<div class="actions">
        <div :class="search" @click="showSearchOverlay">
          <img src="@/assets/actions/Search.svg" alt="Search">
        </div>
        <div :class="notification" @click="changeNotificationMenuState">
          <div class="notify-counter" v-if="requests.length != 0">
            <span>{{requests.length}}</span>
          </div>
          <img src="@/assets/actions/Notification.svg" alt="Notification">
          <transition name="fade">
            <NotificationMenu v-click-outside="hideNotificationMenu" v-show="isNotificationMenuOpened"/>
          </transition>
        </div>
			</div>
        <div class="quickProfile">
          <div :class="quickProfile" v-on:click="changeProfileState">
            <span>{{ name }}</span>
            <div id="profilePicture"></div>
            <div id="profileMenu">
              <img src="@/assets/icons/Arrow.svg" alt="Menu">
            </div>
          </div>
          <transition name="fade">
            <QuickProfile :email="email" :username="name" @closeProfile="hideProfile" v-click-outside="hideProfile" v-if="isQuickProfileOpened"/>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

    export default {
        name: 'Header',
      data:
          function () {
            return {
              id: '',
              email: '',
              username: '',
              name: '',
              isQuickProfileOpened: false,
              isSearchOverlayVisible: false,
              isNotificationMenuOpened: false,
              requests: ''
            }
          },
      computed: {
        quickProfile: function () {
          if(this.isQuickProfileOpened) {
            return 'quick-profile-wrapper quick-profile-active'
          }
          return 'quick-profile-wrapper'
        },
        search: function () {
          if(this.isSearchOverlayVisible) {
            return 'search search-active'
          }
          return 'search'
        },
        notification: function () {
          if(this.isNotificationMenuOpened) {
            return 'notification notification-active'
          }
          return 'notification'
        }
      },
      beforeMount: function() {
        if(document.cookie) {
          let cookie = document.cookie,
              token = cookie.replace(/token=/g, '');
          this.getData(token);
          this.getFriendRequests(token);
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
                this.name = `${userData.data.data[0].first_name} ${userData.data.data[0].last_name}`;
              })
              .catch(error => console.log('error', error));
        },
        hideProfile: function() {
          this.isQuickProfileOpened = false;
        },
        changeProfileState: function() {
          this.isSearchOverlayVisible = false
          this.isNotificationMenuOpened = false;
          if(this.isQuickProfileOpened) {
            this.isQuickProfileOpened = false;
          } else {
            this.isQuickProfileOpened = true;
          }
        },
        hideNotificationMenu: function() {
          this.isNotificationMenuOpened = false;
        },
        changeNotificationMenuState: function() {
          this.isQuickProfileOpened = false;
          this.isSearchOverlayVisible = false
          if(this.isNotificationMenuOpened) {
            this.isNotificationMenuOpened = false;
          } else {
            this.isNotificationMenuOpened = true;
          }
        },
        showSearchOverlay: function () {
          this.isQuickProfileOpened = false;
          this.isNotificationMenuOpened = false;
          this.isSearchOverlayVisible = true;
        },
        closeSearchOverlay: function () {
          this.isSearchOverlayVisible = false
        },
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
          QuickProfile: () => import('@/components/Buttons/QuickProfile.vue'),
          NotificationMenu: () => import('@/components/Buttons/Notification.vue'),
          SearchOverlay: () => import('@/components/Overlay/Search.vue')
      },
      directives: {
        ClickOutside
      },
      mounted() {
        this.popupItem = this.$el
      }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .15s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
    }
    .header {
        position: sticky;
        top: 0;
        width: 100%;
        height: 64px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        -webkit-box-shadow: 0px -5px 30px 0px rgba(0, 0, 0, 0.06);
        -moz-box-shadow:    0px -5px 30px 0px rgba(0, 0, 0, 0.06);
        box-shadow:         0px -5px 30px 0px rgba(0, 0, 0, 0.06);
        z-index: 99;
    }

    .header .logo {
        margin-left: 75px;
    }

    .header .logo h2{
        font-family: 'Montserrat', sans-serif;
        font-size: 25px;
        font-weight: 800;
        color: #3B405C;
        align-self: center;
    }

    .main-nav {
        margin-left: 140px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .main-nav a {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-left: 48px;
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: #6D7188;
    }

    .main-nav span {
        margin-left: 10px;
    }

    .main-nav img {
        stroke: #000;
    }

    .main-nav a:first-child {
        margin-left: 0px;
    }

    .profile {
        margin-right: 75px;
        display: flex;
        flex-flow: row nowrap;
      height: 100%;
    }

    .notify-counter {
      position: absolute;
      right: 15px;
      top: 10px;
      height: 20px;
      width: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      background: #9677F1;
      border-radius: 50%;
    }

    .notify-counter span {
      font-size: 14px;
      font-weight: 700;
      font-family: "Source Sans Pro", sans-serif;
      color: #fff;
      text-align: center;
    }

    .actions .search, .actions .notification {
      width: 64px;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      transition: 0.15s ease-in-out;
      cursor: pointer;
    }

    .actions .search:hover, .actions .notification:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .search-active, .notification-active {
      background: rgba(0, 0, 0, 0.04);
    }

    .notification-active:hover {
      background: rgba(0, 0, 0, 0.04) !important;
    }

    .notification {
      position: relative;
    }

    #profilePicture {
        height: 40px;
        width: 40px;
        border-radius: 16px;
        background: url('../assets/illustrations/user.jpg');
        background-size: cover;
        margin-right: 16px;
    }

    .quickProfile, .quick-profile-wrapper {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        position: relative;
      cursor: pointer;
      transition: 0.15s ease-in-out;
      height: 100%;
    }

    .quick-profile-wrapper {
      padding: 0 16px;
    }

    .header .actions {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .quick-profile-wrapper:hover {
      background: rgba(0,0,0,0.02);
    }

    .quick-profile-active {
      background: rgba(0,0,0,0.04);
    }

    .quick-profile-active:hover {
      background: rgba(0,0,0,0.04);
    }

    .quick-profile-wrapper span {
        font-family: "Source Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 600;
        margin-right: 16px;
        color: #6D7188;
    }
</style>