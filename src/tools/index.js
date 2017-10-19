import moment from 'moment'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default {
  moment: (obj, format = FORMAT) => {
    return moment(obj).format(format)
  },
  utc: (obj, format = FORMAT) => {
    return moment(obj).utc().format(format)
  },
  deleteConfirm: function (_this, handler) {
    setTimeout(() => {
      document.querySelector('.el-message-box__headerbtn').style.display = 'none'
    }, 100)
    _this.$confirm('确定要删除吗', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      handler()
    }).catch(() => {
    })
  }
}
