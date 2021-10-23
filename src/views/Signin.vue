<template>
  <div id="signin-page">
    <ConfirmOverlay @close="closeOverlay" v-if="isConfirm" />
    <div class="container">
      <div class="row logo">
        <h1 class="col">ServiceDriver</h1>
      </div>
      <div class="row auth-block">
        <SignInWindow/>
        <div class="col-6 offset-1 info">
          <h1 class="title">Присоединяйтесь к <br> Service Driver</h1>
          <p class="description">Высококачественный прототип будущего проекта, а также свежий взгляд на привычные вещи - безусловно открывает новые горизонты для экспериментов.</p>
          <Button isLink="true" link="/signup" color="btn-outline" textContent="Создать аккаунт" />
        </div>
      </div>
    </div>
    <div class="auth-footer">
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signin',
  data: function() {
    return {
      isConfirm: false
    }
  },
  methods: {
    closeOverlay: function () {
      this.isConfirm = false;
    }
  },
  props: {
    needConfirm: Boolean
  },
  components: {
    SignInWindow: () => import('@/components/SigninWindow.vue'),
    Button: () => import('@/components/Buttons/Button.vue'),
    ConfirmOverlay: () => import('@/components/Overlay/ConfirmEmail')
  },
  mounted() {
    if(this.needConfirm == true) {
      this.isConfirm = true
    }
  }
}
</script>

<style scoped>
#signin-page {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/auth-bg.png");
  background-size: cover;
}

body {
  background-size: cover;
}

.title {
  margin-top: 45px;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  font-weight: 800;
  font-size: 32px;
}

.description {
  margin-top: 45px;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
}

.info button {
  margin-top: 45px;
}

.logo {
  padding: 17px 0;
}

.logo h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 25px;
  font-weight: 800;
  color: #fff;
  margin: 0;
}

.auth-block {
  margin-top: 90px;
}

.auth-footer {
  position: absolute;
  bottom: 0px;
  padding: 30px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-footer span {
  color: #C0BFD3;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
}

</style>
