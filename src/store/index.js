import Vue from 'vue'
import Vuex from 'vuex'
import { fetchSocial, fetchSiteInfo, fetchCategory, fetchList } from '@/api'
import _ from '../utils'

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: '',
    categoryList: [],
    articleList: {
        list: [],
        currPage: '',
        hasNextPage: ''
    },
    articleTypeList: {
        list: [],
        currPage: '',
        hasNextPage: '',
        type: ''
    }
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) => {
        state.websiteInfo = v;
    },
    CATEGORY_LIST: (state, v) => {
        state.categoryList = v;
    },
    POST_LIST: (state, v) => {
        state.articleList = v;
    },
    POST_KEY_LIST: (state, v) => {
        state.articleTypeList = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = _.getTimeInterval(runAt);
            }, 1000);
        }
    }
}
const actions = {
    setLoading: ({ commit }, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({ commit }) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({ commit, state }) => {
        return new Promise(resolve => {
            if (state.websiteInfo) {
                resolve(state.websiteInfo)
            } else {
                fetchSiteInfo().then(res => {
                    let data = res.data || {}
                    commit('SET_SITE_INFO', data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    getCategory: ({ commit, state }) => {
        return new Promise(resolve => {
            fetchCategory().then(res => {
                let data = res.data || {}
                commit('CATEGORY_LIST', data);
                resolve(data);
            }).catch(err => {
                resolve({});
            })
        })
    },
    //进入路由会先获取之前存在的数据，如果没有数据再去获取
    getFetchList: ({ commit, state }, condition) => {
        let useSearch = Object.keys(condition).length > 1
        return new Promise(resolve => {
            if (!_.isEmpty(state.articleList.list) && !useSearch) {
                resolve(state.articleList)
            } else if (!_.isEmpty(state.articleTypeList.list) && useSearch) {
                resolve(state.articleTypeList)
            } else {
                fetchList(condition).then(res => {
                    let data = res.data || {}
                    let postList = []
                    let currPage = ''
                    let hasNextPage = ''
                    let result = {}
                    if (!useSearch) {
                        postList = state.articleList.list.concat(data.blogs || []);
                        currPage = data.page;
                        hasNextPage = data.hasNextPage;
                        result = { list: postList, currPage: currPage, hasNextPage: hasNextPage }
                        commit('POST_LIST', result);
                    } else {
                        postList = state.articleTypeList.list.concat(data.blogs || []);
                        currPage = data.page;
                        hasNextPage = data.hasNextPage;
                        result = { list: postList, currPage: currPage, hasNextPage: hasNextPage, type: condition[Object.keys(condition)[0]] }
                        commit('POST_KEY_LIST', result);
                    }
                    resolve(result);
                }).catch(err => {
                    resolve({});
                })
            }
        })

    },
    //首页数据和搜索类型数据分开缓存
    getLoadMore: ({ commit, state }, condition) => {
        let useSearch = Object.keys(condition).length > 1
        return new Promise(resolve => {
            fetchList(condition).then(res => {
                let data = res.data || {}
                let postList = []
                let currPage = ''
                let hasNextPage = ''
                let result = {}
                if (!useSearch) {
                    postList = state.articleList.list.concat(data.blogs || []);
                    currPage = data.page;
                    hasNextPage = data.hasNextPage;
                    result = { list: postList, currPage: currPage, hasNextPage: hasNextPage }
                    commit('POST_LIST', result);
                } else {
                    postList = state.articleTypeList.list.concat(data.blogs || []);
                    currPage = data.page;
                    hasNextPage = data.hasNextPage;
                    result = { list: postList, currPage: currPage, hasNextPage: hasNextPage, type: condition[Object.keys(condition)[0]] }
                    commit('POST_KEY_LIST', result);
                }
                resolve(result);
            }).catch(err => {
                resolve({});
            })
            // }
        })

    },
    getSocials: ({ commit, state }) => {
        let data = [
            {
                id: 1,
                title: 'QQ',
                icon: 'iconqq',
                color: '#1AB6FF ',
                href: 'http://wpa.qq.com/msgrd?v=3&uin=787326576&site=qq&menu=yes'
            },
            {
                id: 2,
                title: 'Gitee',
                icon: 'icongitee',
                color: '#d81e06',
                href: 'https://gitee.com/zhangpark'
            },
            {
                id: 3,
                title: 'GitHub',
                icon: 'icongithub',
                color: '',
                href: 'https://github.com/hoxiete'
            },
            {
                id: 4,
                title: 'CSDN',
                icon: 'iconcsdn',
                color: 'red',
                href: 'https://blog.csdn.net/zhhao1'
            }
        ]
        commit('SET_SOCIALS', data);
        return data
        // return new Promise((resolve => {
        //     if (state.socials){
        //         resolve(state.socials)
        //     } else {
        //         fetchSocial().then(res =>{
        //             let data = res.data || []
        //             commit('SET_SOCIALS',data);
        //             resolve(data);
        //         }).catch(err =>{
        //             resolve([]);
        //         })
        //     }
        // }))
    }
}
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo ? state.websiteInfo.notice : '',
    categoryList: state => state.categoryList ? state.categoryList : '',
    postList: state => state.postList ? state.postList : ''
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
