<template lang="jade">
.info(v-if='info')
  p 姓名: {{info.name}}
  p 公司名称: {{info.company_name}}
  p 手机/微信: {{info.contact_phone}}
  p 邮箱: {{info.email}}
  p 联系人: {{info.contact_person}}
  p 联系人电话: {{info.contact_phone}}
  p 推荐人: {{info.referrer}}
  p 推荐人联系方式: {{info.referrer_phone}}
  p 公司概况描述: {{info.company_description}}
  p 公司网址: {{info.web_site}}
  p 公司所处轮次: {{info.company_size}}
  p 主要投资机构或负责人: {{info.invest_company}}
  p 学校或专业: {{info.school_or_profession}}
  p 您希望与前沿社会员分享的内容: {{info.share_content}}
  p 您的主要从业或创业经历: {{info.experience}}
</template>

<script>
export default {
  name: 'info',
  props: ['info']
}
</script>

<style lang="stylus" scoped>
.info
  font-size 14px
  p
    line-height 20px
</style>
