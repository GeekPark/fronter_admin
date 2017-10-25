<template lang="jade">
#search-tag
  el-select(v-model='select', multiple, filterable, remote,placeholder='请选择活动嘉宾', :remote-method='remoteMethod', :loading='loading')
    el-option(v-for='item in allGuest', :key='item.id', :label='item.name', :value='item.id')
</template>

<script>
import api from 'stores/api'
export default {
  name: 'search-tag',
  data () {
    return {
      allGuest: [],
      select: [],
      loading: false
    }
  },
  props: {callback: Function, guests: Array},
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        setTimeout(() => {
          this.loading = true
          api.get('admin/guests', { params: {name: query} })
          .then(result => {
            this.loading = false
            this.allGuest = result.data.guests
          })
        }, 500)
      } else {
        this.allGuest = []
      }
    }
  },
  watch: {
    'select': function (val) {
      this.callback(this.select)
    },
    'guests': function (val) {
      if (this.guests.length <= 0) { return }
      this.allGuest = this.guests
      this.select = this.guests.map(el => el.id)
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
</style>

