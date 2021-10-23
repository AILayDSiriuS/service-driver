import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userdata: [],
        tests: [],
        articles: [],
        videos: []
    },
    mutations: {
        SET_USERDATA_TO_STATE: (state, userdata) => {
            state.userdata = userdata;
        },
        SET_TESTS_TO_STATE: (state, tests) => {
            state.tests = tests;
        },
        SET_ARTICLES_TO_STATE: (state, articles) => {
            state.articles = articles;
        },
        SET_VIDEOS_TO_STATE: (state, videos) => {
            state.videos = videos;
        }
    },
    actions: {
        GET_USERDATA_FROM_API({commit}) {
            let cookie = document.cookie,
                token = cookie.replace(/token=/g, '');
            return axios('http://95.214.62.187/auth/me/', {
                method: "GET",
                headers: { "Authorization": `Token ${token}` },
            })

                .then((userdata) => {
                    commit('SET_USERDATA_TO_STATE', userdata.data);
                    return userdata;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        GET_TESTS_FROM_API({commit}) {
            let cookie = document.cookie,
                token = cookie.replace(/token=/g, '');
            return axios('http://95.214.62.187/api/v1/exams/', {
                method: "GET",
                headers: { "Authorization": `Token ${token}` },
            })
                .then((tests) => {
                    commit('SET_TESTS_TO_STATE', tests)
                    return tests;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        GET_ARTICLES_FROM_API({commit}) {
            let cookie = document.cookie,
                token = cookie.replace(/token=/g, '');
            return axios('http://95.214.62.187/api/v1/main/posts/28', {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((articles) => {
                    commit('SET_ARTICLES_TO_STATE', articles)
                    return articles;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        GET_VIDEOS_FROM_API({commit}) {
            let cookie = document.cookie,
                token = cookie.replace(/token=/g, '');
            return axios('http://95.214.62.187/api/v1/videos/all_videos', {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((videos) => {
                    commit('SET_VIDEOS_TO_STATE', videos)
                    return videos;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        }
    },
    getters: {
        USERDATA(state) {
            return state.userdata;
        },
        TESTS(state) {
            return state.tests;
        },
        ARTICLES(state) {
            return state.articles;
        },
        VIDEOS(state) {
            return state.videos;
        }
    }
})
