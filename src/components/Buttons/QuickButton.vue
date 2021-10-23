<template>
        <div class="col-3">
            <router-link class="quick" :to="href">
                <div class="icon">
                    <img src="../../assets/icons/FavoriteQuick.svg" alt="" v-if="title == 'Избранное'">
                    <img src="../../assets/icons/FriendsQuick.svg" alt="" v-if="title == 'Друзья'">
                    <img src="../../assets/icons/EducationQuick.svg" alt="" v-if="title == 'Обучение'">
                    <img src="../../assets/icons/StatsQuick.svg" alt="" v-if="title == 'Статистика'">
                </div>
                <span>
                    {{ title }}
                </span>
            </router-link>
        </div>
</template>

<script>
    export default {
      name: 'QuickButton',
      props: {
        title: String,
        href: String
        }
    }
</script>

<style>
    .quick {
        border-radius: 7px;
        background: #fff;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-top: 46px;
        height: 80px;
        transition: 0.25s ease-in-out;
        -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0 15px 30px 0 rgba(0, 0, 0, 0.03);
        box-shadow:         0 15px 30px 0 rgba(0, 0, 0, 0.03);
    }

    .quick:hover {
        transform: translateY(-4px);
    }

    .quick .icon {
        margin-left: 16px;
    }

    .quick span {
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #6D7188;
        margin-left: 16px;
    }
</style>
