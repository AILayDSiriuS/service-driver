<template>
    <div class="friend" @click="toUser">
        <div class="profile-friends__friend">
          <div class="friend-picture">
          </div>
          <span>{{data.first_name}} {{data.last_name}}</span>
        </div>
        <!-- Когда будет готова серверная часть - router-link :to "`/laws/${data.id}`" -->
    </div>
</template>

<script>
    export default {
      name: 'ProfileFriend',
      computed: {
          time() {
            let date1 = new Date(this.data.date);
            let date2 = new Date();
            return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
          }
      },
      props: {
        data: {
          type: Object,
          default() {
            return {}
          }
        },
        id: Number
      },
      methods: {
        toUser: function() {
          this.$router.push(`/users/${this.data.id}`);
        }
      }
    }
</script>


<style scoped>
  .friend {
    cursor: pointer;
  }

  .profile-friends__friend {
    width: 198px;
    height: 210px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    transition: 0.15s ease-in-out;
  }

  .profile-friends__friend:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .friend-picture {
    height: 74px;
    width: 74px;
    background: url('../../assets/illustrations/user.jpg');
    background-size: cover;
    border-radius: 29px;
  }

  .profile-friends__friend span {
    font-family: "Montserrat", sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #6D7188;
    margin-top: 30px;
    text-align: center;
  }
</style>