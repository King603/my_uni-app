export default {
  state: {
    footer_nav: [
      {
        name: '首页',
        name_code: 'index',
        icon: '/static/tabbar/1-0.png',
        select_icon: '/static/tabbar/1-1.png',
        size: 'small'
      },
      {
        name: '统计',
        name_code: 'stat',
        icon: '/static/tabbar/2-0.png',
        select_icon: '/static/tabbar/2-1.png',
        size: 'small'
      },
      {
        name: '铺货',
        name_code: 'medic',
        icon: '/static/tabbar/5.png',
        select_icon: '/static/tabbar/5.png',
        size: 'big'
      },
      {
        name: '团队',
        name_code: 'team',
        icon: '/static/tabbar/4-0.png',
        select_icon: '/static/tabbar/4-1.png',
        size: 'small'
      },
      {
        name: '我的',
        name_code: 'my',
        icon: '/static/tabbar/3-0.png',
        select_icon: '/static/tabbar/3-1.png',
        size: 'small'
      },

    ],
    now_page_index: 0,
  },
  mutations: {
    change_nav_list(state, data) {
      state.footer_nav = data;
    },
    change_page(state, index) {
      state.now_page_index = index;
    }
  }
}