import Vue from 'vue'
import VueRouter from 'vue-router'
// import config from './config'

import Observers from 'views/Observers.vue'
import ObserverInfo from 'views/ObserverInfo.vue'
import ObserverApply from 'views/ObserverApply.vue'
import ObserverApplyInfo from 'views/ObserverApplyInfo.vue'
import Members from 'views/Members.vue'
import MemberInfo from 'views/MemberInfo.vue'
import MemberApply from 'views/MemberApply.vue'
import MemberApplyInfo from 'views/MemberApplyInfo.vue'
import Timeline from 'views/Timeline.vue'
import Guests from 'views/Guests.vue'

import Errors from 'views/Errors.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/guests',
      name: 'Guests',
      component: Guests,
      meta: {title: '嘉宾管理'}
    },
    { path: '/timeline',
      name: 'timeline',
      component: Timeline,
      meta: {title: '动态管理'}
    },
    { path: '/member/apply',
      name: 'MemberApply',
      component: MemberApply,
      meta: {title: '会员申请'}
    },
    { path: '/member/apply/:id',
      name: 'MemberApplyInfo',
      component: MemberApplyInfo,
      meta: {title: '会员申请详情'}
    },
    { path: '/',
      redirect: '/members'
    },
    { path: '/members',
      name: 'Members',
      component: Members,
      meta: {title: '会员管理'}
    },
    { path: '/member/:id',
      name: 'MemberInfo',
      component: MemberInfo,
      meta: {title: '会员'}
    },
    { path: '/observer/apply',
      name: 'ObserverApply',
      component: ObserverApply,
      meta: {title: '观察员申请'}
    },
    { path: '/observer/:id',
      name: 'ObserverInfo',
      component: ObserverInfo,
      meta: {title: '观察员'}
    },
    { path: '/observer/apply/:id',
      name: 'ObserverApplyInfo',
      component: ObserverApplyInfo,
      meta: {title: '观察员申请详情'}
    },
    { path: '/observers',
      name: 'Observers',
      component: Observers,
      meta: {title: '观察员管理'}
    },
    { path: '*',
      component: Errors,
      meta: {title: 'Error'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
