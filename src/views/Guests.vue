<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}}
      router-link(to='/guest/new')
        el-button(type='text') 添加嘉宾
    .filter
      //- el-button(type='text',
      //-           @click='params.status = "all"',
      //-           v-bind:class='{active: params.status === "all"}') 全部
      //- | /
      //- el-button(type='text',
      //-           @click='params.status = "pass"',
      //-           v-bind:class='{active: params.status === "pass"}') 已通过
      //- | /
      //- el-button(type='text',
      //-           @click='params.status = "wait"',
      //-           v-bind:class='{active: params.status === "wait"}') 待处理
      el-input(placeholder="搜索",
               icon="search",
               v-model="params.show_name",
               @keyup.enter.native='fetch',
               :on-icon-click="fetch")
  el-table(:data='listData.guests' border)
    el-table-column(prop='name', label='姓名')
    el-table-column(prop='company', label='公司', width="150")
    el-table-column(prop='duty', label='职位', width="140")
    el-table-column(prop='created_at', label='创建时间', width="180")
    el-table-column(label='操作', width="140")
      template(scope='scope')
        el-button(type='text',
                  @click='handleEdit(scope.row)') 编辑
        el-button(type='text',
                  @click='handleDestroy(scope.row)') 删除
  el-pagination(@current-change='handleCurrentChange',
                :current-page='params.page',
                :page-size='listData.meta.limit_value',
                layout='total, prev, pager, next, jumper',
                :total='listData.meta.total_count')
</template>

<script>
import tools from 'tools'
import api from 'stores/api'

const url = 'admin/guests'

export default {
  data () {
    return {
      params: {
        status: this.$route.query.status || 'all',
        show_name: '',
        page: 1
      },
      listData: {
        guests: [],
        meta: {
          total_count: 0,
          limit_value: 0
        }
      }
    }
  },
  methods: {
    handleCurrentChange (index, val) {
      this.params.page = index
      this.fetch()
      console.log(`当前页: ${index}`)
    },
    fetch () {
      const params = Object.assign({}, this.params)
      if (params.status === 'all') {
        delete params.status
      }
      if (params.show_name === '') {
        delete params.show_name
      }
      api.get(url, {params: params}).then((result) => {
        this.listData = result.data
        this.listData.guests.forEach(el => {
          el.created_at = el.created_at ? tools.moment(new Date(el.created_at)) : ''
        })
      }).catch((err) => {
        console.log(err)
        this.$message.error(err.toString())
      })
    },
    handleDestroy (val) {
      const destroy = () => {
        api.delete(`${url}/${val.id}`).then((result) => {
          this.$message.success('success')
          this.fetch()
        }).catch((err) => {
          console.log(err)
          this.$message.error(err.toString())
        })
      }
      tools.deleteConfirm(this, destroy)
    },
    handleEdit (row) {
      this.$router.push(`guest/${row.id}`)
    }
  },
  watch: {
    'params.status': function () {
      this.fetch()
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.active
  color #7F7F7F
</style>
