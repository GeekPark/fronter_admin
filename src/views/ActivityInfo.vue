<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}} {{info.name}}
  el-form(ref='member-form', :model='params', label-width='150px', label-position='top')
    el-form-item(label='活动标题')
      el-input(placeholder='', v-model='params.title')
    el-form-item(label='简介')
      el-input(type='textarea',  v-model='params.description')
    el-form-item(label='活动时间')
      el-date-picker(v-model='params.activity_time',
                     type='datetime',
                     placeholder='选择日期时间')
    el-form-item(label='活动地点')
      el-input(placeholder='', v-model='params.address')
    el-form-item(label='活动类型')
      el-select(v-model='params.activity_type', placeholder='请选择')
        el-option(v-for='item in activity_types',
                  :label='item[1]',
                  :value='item[0]',
                  :key='item[0]')
    el-form-item(label='活动嘉宾')
      search-guest(:callback='searchGuest', :guests='info.guest')
    el-form-item(label='文章链接')
      el-input(v-model='params.article_link')
    el-form-item(label='活动头图')
      upload(:callback='uploadImage', :url='params.avatar_url', :uploadDelete="uploadDelete")
    el-form-item(label='')
      el-button(type='primary', :disabled='disabled', @click='submit') 提交
      el-button(type='danger', @click='close') 关闭
</template>

<script>
// import tools from 'tools'
import api from 'stores/api'
import SearchGuest from 'components/SearchGuest.vue'

const url = 'admin/activities'

export default {
  components: {
    'search-guest': SearchGuest
  },
  data () {
    return {
      info: {},
      disabled: false,
      params: {
        title: '',
        description: '',
        activity_time: '',
        address: '',
        article_link: '',
        avatar_url: '',
        avatar_id: '',
        activity_type: '',
        guest: []
      },
      activity_types: [
        ['workshop', '前沿工作坊'],
        ['camp', '超频之旅'],
        ['study', '近场研究']
      ]
    }
  },
  methods: {
    fetch () {
      api.get(`${url}/${this.$route.params.id}`).then((result) => {
        this.info = result.data.activity
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
      if (this.params.avatar_url === '') {
        delete this.params.avatar_url
      }
      console.log(this.params)
      if (this.$route.params.id) {
        api.patch(`${url}/${this.$route.params.id}`, this.params).then(handle)
      } else {
        api.post(url, this.params).then(handle)
      }
    },
    close () {
      this.$router.push('/activities')
    },
    uploadImage (img) {
      this.params.avatar_id = img.id
      this.params.avatar_url = ''
    },
    uploadDelete () {
      this.params.avatar_url = 'deleted'
      this.params.avatar_id = ''
    },
    searchGuest (guest) {
      this.params.guest = guest
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
