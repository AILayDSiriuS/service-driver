<template>
  <div class="alert-overlay-wrapper" ref="overlay-wrapper">
    <div class="alert-overlay">
      <div class="alert-top">
        <h2>Вы действительно хотите завершить тест?</h2>
        <p>In nec nunc quis sem hendrerit euismod. Curabitur purus turpis, sollicitudin porttitor tempus interdum, molestie vitae sapien. Proin dictum, ex in molestie blandit, ligula magna facilisis magna, et ullamcorper augue est ut erat.</p>
      </div>
      <div class="alert-bottom">
        <div class="left">
          <a href="#">Кто спрашивает?</a>
        </div>
        <div class="right">
          <Button isLink="false" @action="finish" color="btn-outline-blue" textContent="Да" />
          <Button isLink="false" @action="close" color="btn-b" textContent="Нет" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FinishTestAlert',
  methods: {
    close() {
      this.$emit('close')
    },
    finish() {
      this.$emit('doFinish')
    }
  },
  components: {
    Button: () => import('@/components/Buttons/Button.vue')
  },
  mounted() {
    let vm = this;
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['overlay-wrapper']) {
        vm.close();
      }
    })
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['overlay-close']) {
        vm.close();
      }
    })
  }
}
</script>


<style scoped>
.alert-overlay h2 {
  font-size: 22px;
}


.alert-overlay-wrapper {
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
.alert-overlay {
  padding: 50px;
  position: fixed;
  z-index: 101;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.alert-top {
  padding: 45px 30px;
  width: 770px;
  height: 219px;
  background: #fff;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow:    0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  box-shadow:         0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-flow: column nowrap;
}

.alert-bottom {
  width: 770px;
  height: 114px;
  background: #F7F7F7;
  border-radius: 0 0 30px 30px;
  padding: 0 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.alert-bottom button:first-child {
  margin-right: 30px;
}

.alert-bottom .left a {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  color: #C0BFD3;
  font-weight: 700;
}

.alert-overlay .content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}

.alert-top p {
  font-size: 18px;
  font-family: "Source Sans Pro", sans-serif;
  color: #6D7188;
  margin-top: 30px;
}
</style>