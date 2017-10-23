<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}} {{info.name}}
  info(:info='info')
  .state
    p 状态
    el-select(v-model='params.status', placeholder='请选择')
      el-option(v-for='item in states',
                :label='item.title',
                :value='item.val',
                :key='item.val')
  .actions
    el-button(type='primary', :disabled='disabled', @click='submit') 提交
    el-button(type='danger', @click='close') 关闭
</template>

<script>
// import tools from 'tools'
import api from 'stores/api'
import UserInfo from 'components/UserInfo.vue'

const url = 'admin/observers_applies'

export default {
  components: {
    'info': UserInfo
  },
  data () {
    return {
      info: {},
      disabled: false,
      params: {
        status: 'wait'
      },
      states: [{
        title: '待处理',
        val: 'wait'
      }, {
        title: '已通过',
        val: 'pass'
      }]
    }
  },
  methods: {
    fetch () {
      api.get(`${url}/${this.$route.params.id}`).then((result) => {
        console.log(result.data)
        this.info = result.data.observers_apply
        Object.keys(this.params).forEach(key => {
          this.params[key] = this.info[key]
        })
        this.states.forEach(el => {
          if (el.title === this.info.status) {
            this.params.status = el.val
          }
        })
      }).catch((err) => {
        console.log(err)
        this.$message.error(err.toString())
      })
    },
    submit () {
      api.put(`${url}/${this.$route.params.id}`, this.params).then((result) => {
        this.$message.success('success')
        this.close()
      }).catch((err) => {
        console.log(err)
        this.$message.error(err.toString())
      })
    },
    close () {
      this.$router.push('/observer/apply')
    },
    uploadImage (img) {
      this.params.avatar_id = img.id
      this.params.avatar_url = ''
    },
    uploadDelete () {
      this.params.avatar_url = 'deleted'
      this.params.avatar_id = ''
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.state
  margin-bottom 20px
.el-input, .el-textarea
  width 30%
  min-width 200px
</style>
