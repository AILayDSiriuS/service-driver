<template>
  <div id="signup-page">
    <div class="logo">
      <div class="container">
        <div class="row">
          <h1 class="col">ServiceDriver</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row auth-block">
        <SignUpWindow/>
        <div class="col-5 offset-1 info">
          <h1 class="title">Уже есть аккаунт?</h1>
          <p class="description">Высококачественный прототип будущего проекта, а также свежий взгляд на привычные вещи - безусловно открывает новые горизонты для экспериментов, поражающих.</p>
          <Button isLink="true" link="/signin" color="btn-outline-blue" textContent="Выполнить вход" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  components: {
    SignUpWindow: () => import('@/components/SignupWindow.vue'),
    Button: () => import('@/components/Buttons/Button.vue')
  }
}
</script>

<style scoped>
#signup-page {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
body {
  background-size: cover;
}

.logo {
  padding: 16px 0;
  background: rgb(206,159,252);
  background: linear-gradient(-90deg, rgba(206,159,252,1) 0%, rgba(115,103,240,1) 100%);
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

.title {
  margin-top: 45px;
  font-family: "Montserrat", sans-serif;
  color: #3B405C;
  font-weight: 800;
  font-size: 32px;
}

.description {
  margin-top: 45px;
  font-family: "Montserrat", sans-serif;
  color: #3B405C;
  font-weight: 500;
  font-size: 18px;
}

.info button {
  margin-top: 45px;
}
</style>
