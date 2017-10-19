<template lang="jade">
#vsider
  el-row.tac
    router-link(to="/")
      .sider-logo
        span {{$store.state.config.title}}
    el-col(:span='8')
      el-menu.el-menu-vertical-demo(router=true, @open='handleOpen', @close='handleClose', theme="dark")
        el-menu-item(index='/member/apply')  会员申请
        el-menu-item(index='/observer/apply')  观察员申请
        el-menu-item(index='/members')  会员管理
        el-menu-item(index='/observers')  观察员管理
        el-menu-item(index='/guests')  嘉宾管理
        el-menu-item(index='/timelines')  动态管理
</template>

<script>
export default {
  name: 'vsider',
  computed: {
  },
  data () {
    return {
      routes: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  beforeMount () {
  }
}
</script>

<style lang="stylus" scoped>

#vsider
  texta-align left
  &
    text-align left
  .sider-logo
    color #bfcbd9
    font-size 18px
    margin 20px 10px
    text-align center
    img
      width 20px
      vertical-align middle
      margin-right 5px
      border-radius 3px
    span
      height 30px
      vertical-align middle
  .el-col
    // border-top 2px solid rgb(0, 164, 186)
    img
      width 15px
      vertical-align: baseline;
      margin-top: 10px;
      position: absolute;
      top: 10px;
    span
      margin-left 25px
</style>

