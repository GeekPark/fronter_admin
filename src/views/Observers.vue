<template lang="jade">
#admin-posts.admin
  .admin-header
    .title
      h1 {{$route.meta.title}}
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
  el-table(:data='listData.observers_manages' border)
    el-table-column(prop='show_name', label='姓名')
    el-table-column(prop='show_company', label='公司', width="150")
    el-table-column(prop='show_duty', label='职位', width="110")
    el-table-column(prop='join_time', label='加入时间', width="180")
    el-table-column(prop='failure_time', label='到期时间', width="180")
    el-table-column(prop='status', label='状态', width="90")
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

const url = 'admin/observers_manages'

export default {
  data () {
    return {
      params: {
        status: this.$route.query.status || 'all',
        show_name: '',
        page: 1
      },
      listData: {
        observers_manages: [],
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
        this.listData.observers_manages.forEach(el => {
          el.join_time = el.join_time ? tools.moment(new Date(el.join_time)) : ''
          el.failure_time = el.failure_time ? tools.moment(new Date(el.failure_time)) : ''
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
      this.$router.push(`/observer/${row.id}`)
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
