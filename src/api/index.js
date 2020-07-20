import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}

export function fetchFocus() {
    let data =  [{
        id: 1,
        title: 'Akina',
        img: 'https://s1.ax1x.com/2020/05/14/YDfRnU.jpg'
    },
    {
        id: 2,
        title: '使用说明',
        img: 'https://s1.ax1x.com/2020/05/14/YDf4AJ.jpg'
    },
    {
        id: 3,
        title: '文章归档',
        img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'
    }]
    let res = {data:data}
    return data
    // return request({
    //     url: '/focus/list',
    //     method: 'get',
    //     params: {}
    // })
}

export function fetchCategory() {
    return request({
        url: '/getBlogTypeList',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/social',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
