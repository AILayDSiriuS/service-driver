<template>
    <div class="search-overlay-wrapper" ref="overlay-wrapper">
      <img src="@/assets/icons/Close.svg" ref="overlay-close" class="close-overlay">
      <div class="search-overlay">
        <input type="text" class="search-field" v-model="query" placeholder="Поиск" @keyup.enter="doSearch">
        <div @click="doSearch" class="search-icon">
          <img src="@/assets/icons/Search.svg" >
        </div>
      </div>
      <div class="all-users-button">
        <div @click="toUsers" class="all-users-div">
          <img src="@/assets/icons/Search-Alt.svg">
          <span>Показать всех пользователей</span>
        </div>
        
      </div>
    </div>

</template>

<script>
    export default {
        name: 'SearchOverlay',
        data: function () {
          return {
            query: ''
          }
        },
        methods: {
            close() {
                this.$emit('close')
            },
          doSearch() {
            this.$emit('close');
            this.$router.push(`/search/${this.query}`);
          },
          toUsers() {
              this.$emit('close');
              this.$router.push('/search/')
          }
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


<style>
    .close-overlay {
      position: absolute;
      right: 75px;
      top: 75px;
      opacity: 0.5;
      cursor: pointer;
    }

    .search-overlay-wrapper {
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0, 0.65);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .search-overlay, .all-users-button {
      width: 770px;
      height: 84px;
      position: relative;
      z-index: 100;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    .all-users-button {
      padding: 15px;
      margin-top: 15px;
      background: #fff;
      border-radius: 30px;
      align-items: center;
    }

    .all-users-div {
      cursor: pointer;
      padding: 15px;
      display: flex;
      align-items: center;
    }

    .all-users-div span {
      margin-left: 15px;
      font-family: "Source Sans Pro", sans-serif;
      font-size: 20px;
      color: #9677F1;
    }

    .search-field {
      background: #fff;
      padding: 22px 40px;
      width: 100%;
      height: 100%;
      font-family: "Source Sans Pro", sans-serif;
      font-size: 28px;
      font-weight: 400;
      border-radius: 30px;
      color: #3B405C;
    }

    .search-field {
      border: none;
      outline: none;
    }

    .search-field:focus {
      border: none;
      outline: none;
    }

    .search-icon {
      position: absolute;
      right: 40px;
      top: 30px;
      z-index: 150;
      cursor: pointer;
    }

    .search-icon img {
      width: 24px;
      height: 24px;
    }
</style>