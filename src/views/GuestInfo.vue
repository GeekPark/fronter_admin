<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}} {{info.name}}
  el-form(ref='member-form', :model='params', label-width='150px', label-position='top')
    el-form-item(label='姓名')
      el-input(placeholder='', v-model='params.name')
    el-form-item(label='公司')
      el-input(v-model='params.company')
    el-form-item(label='职务')
      el-input(v-model='params.duty')
    el-form-item(label='简介')
      el-input(type='textarea',  v-model='params.description')
    el-form-item(label='头像')
      upload(:callback='uploadImage', :url='params.avatar_url', :uploadDelete="uploadDelete")
    el-form-item(label='')
      el-button(type='primary', :disabled='disabled', @click='submit') 提交
      el-button(type='danger', @click='close') 关闭
</template>

<script>
// import tools from 'tools'
import api from 'stores/api'

const url = 'admin/guests'

export default {
  data () {
    return {
      info: {},
      disabled: false,
      params: {
        name: '',
        company: '',
        duty: '',
        description: '',
        avatar_url: '',
        avatar_id: ''
      }
    }
  },
  methods: {
    fetch () {
      api.get(`${url}/${this.$route.params.id}`).then((result) => {
        this.info = result.data.guest
        Object.keys(this.params).forEach(key => {
          this.params[key] = this.info[key]
        })
      }).catch((err) => {
        console.log(err)
        this.$message.error(err.toString())
      })
    },
    submit () {
      const handle = (result) => {
        this.$message.success('success')
        this.close()
      }
      if (this.$route.params.id) {
        api.put(`${url}/${this.$route.params.id}`, this.params).then(handle)
      } else {
        api.post(url, this.params).then(handle)
      }
    },
    close () {
      this.$router.push('/guests')
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
    if (this.$route.params.id) {
      this.fetch()
    }
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
