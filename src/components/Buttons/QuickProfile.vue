<template>
        <div class="quick-profile">
          <div class="triangle"></div>
          <router-link to="/me" class="quick-profile-item">
            Мой профиль
          </router-link>
          <router-link to="/temp" class="quick-profile-item">
            Настройки
          </router-link>
          <div @click="showFeedbackOverlay" class="quick-profile-item">
            Сообщить о проблеме
          </div>
          <router-link to="/logout" class="quick-profile-item">
            Выход
          </router-link>
          <transition name="fade">
            <FeedbackOverlay :username="username" :email="email" @close="hideFeedbackOverlay" v-show="isFeedbackOverlayOpened" />
          </transition>
        </div>
</template>

<script>
    export default {
      name: 'QuickProfile',
      props: {
        email: String,
        username: String
      },
      data: function () {
        return {
          isFeedbackOverlayOpened: false
        }
      },
      methods: {
        showFeedbackOverlay: function() {
          this.isFeedbackOverlayOpened = true;
        },
        hideFeedbackOverlay: function() {
          this.isFeedbackOverlayOpened = false;
        }
      },
      components: {
        FeedbackOverlay: () => import('@/components/Overlay/Feedback.vue')
      }
    }
</script>

<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .quick-profile {
    position: absolute;
    top: 80px;
    width: 100%;
    height: auto;
    background:#fff;
    border: 2px solid #EEEDF3;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 7px;
  }

  .quick-profile-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 17px;
    height: 54px;
    font-family: "Source Sans Pro", sans-serif;
    font-size:16px;
    font-weight: 700;
    color: #C0BFD3;
  }

  .quick-profile-item:hover {
    background: rgba(0, 0, 0, 0.02);
    color: #9677F1;
  }

  .quick-profile::after {
    content: '';
    position: absolute;
    right: calc(100% / 2 - 10px);
    top: -20px;
    border: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }

  .triangle {
    content: '';
    position: absolute;
    right: calc(100% / 2 - 14px);
    top: -27px;
    border: 14px solid transparent;
    border-bottom: 14px solid #EEEDF3;
    z-index: -1;
  }
</style>