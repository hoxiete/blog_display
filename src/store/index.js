import Vue from 'vue'
import Vuex from 'vuex'
import {getTimeInterval} from '../utils/index'
import {fetchSocial,fetchSiteInfo} from '@/api'

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: ''
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) =>{
      state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    }
}
const actions = {
    setLoading: ({commit}, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({commit}) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({commit,state}) =>{
        return new Promise(resolve => {
            if (state.websiteInfo){
                resolve(state.websiteInfo)
            }else {
                fetchSiteInfo().then(res => {
                    let data = res.data || {}
                    commit('SET_SITE_INFO',data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    getSocials: ({commit,state}) =>{
        let data =  [
            {
                id: 1,
                title: 'QQ',
                icon: 'iconqq',
                color: '#1AB6FF ',
                href: 'http://wpa.qq.com/msgrd?v=3&uin=1224971566&site=qq&menu=yes'
            },
            {
                id: 2,
                title: 'Gitee',
                icon: 'icongitee',
                color: '#d81e06',
                href: 'https://gitee.com/fengziy'
            },
            {
                id: 3,
                title: 'GitHub',
                icon: 'icongithub',
                color: '',
                href: 'https://github.com/fengziye'
            },
            {
                id: 4,
                title: 'CSDN',
                icon: 'iconcsdn',
                color: 'red',
                href: 'https://blog.csdn.net/feng_zi_ye'
            }
        ]
        commit('SET_SOCIALS',data);
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
    notice: state => state.websiteInfo?state.websiteInfo.notice:''
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
