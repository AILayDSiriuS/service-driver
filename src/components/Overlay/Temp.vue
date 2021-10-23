<template>
  <div class="overlay-wrapper" ref="overlay-wrapper">
    <div class="container">
      <div class="overlay col-8 offset-2">
        <div class="overlay-top">
          <h2>Данная страница временно недоступна</h2>
          <div class="content">
            <div>
              Функционал этой страницы будет добавлен в следующих обновлениях.
            </div>
          </div>
        </div>
        <div class="overlay-bottom">
            <Button isLink="false" @action="close" textContent="ОК" color="btn-b" />
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Temp',
  methods: {
    close() {
      this.$emit('close')
    }
  },
  components: {
    Button: () => import('@/components/Buttons/Button')
  }
}
</script>


<style>

.overlay-top {
  padding: 45px 30px;
  border-radius: 30px 30px 0 0;
  background: #FFFFFF;
}

.overlay-bottom {
  height: 114px;
  background: #F7F7F7;
  border-radius: 0 0 30px 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
}

.overlay-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.overlay-top h2 {
  font-size: 22px;
}

.overlay-content p {
  margin-top: 30px;
  font-family: "Source Sans Pro", sans-serif;
  color: #6D7188;
  font-size: 18px;
}

.overlay-footer {
  width: 100%;
}

.overlay-wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.65);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}

.overlay-content .tags {
  margin-top: 8px;
}

.overlay-content hr {
  margin-top: 16px;
}

.overlay .content {
  margin-top: 24px;
  font-size: 18px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  color: #6D7188;
}
</style>