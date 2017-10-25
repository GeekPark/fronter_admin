<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}} {{info.name}}
  info(:info='info')
  el-form(ref='observers-form', :model='params', label-width='150px', label-position='top')
    el-form-item(label='加入日期')
      el-date-picker(v-model='params.join_time',
                     type='datetime',
                     placeholder='选择日期时间')
    el-form-item(label='失效日期')
      el-date-picker(v-model='params.failure_time',
                     type='datetime',
                     placeholder='选择日期时间')
    el-form-item(label='姓名')
      el-input(placeholder='', v-model='params.name')
    el-form-item(label='公司')
      el-input(v-model='params.company_name')
    el-form-item(label='职务')
      el-input(v-model='params.duty')
    el-form-item(label='简介')
      el-input(type='textarea',  v-model='params.show_description')
    el-form-item(label='头像')
      upload(:callback='uploadImage', :url='params.avatar_url', :uploadDelete="uploadDelete")
    el-form-item(label='')
      el-button(type='primary', :disabled='disabled', @click='submit') 提交
      el-button(type='danger', @click='close') 关闭
</template>

<script>
// import tools from 'tools'
import api from 'stores/api'

const url = 'admin/observers_manages'

export default {
  data () {
    return {
      info: {},
      disabled: false,
      params: {
        failure_time: '',
        join_time: '',
        name: '',
        company_name: '',
        duty: '',
        show_description: '',
        avatar_url: '',
        avatar_id: ''
      }
    }
  },
  methods: {
    fetch () {
      api.get(`${url}/${this.$route.params.id}`).then((result) => {
        this.info = result.data.observers_manage
        Object.keys(this.params).forEach(key => {
          this.params[key] = this.info[key]
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
      this.$router.push('/observers')
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
