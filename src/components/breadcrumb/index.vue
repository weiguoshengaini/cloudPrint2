<template>
 <div class="breadcrumb-box">
    <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
  <div class="el-icon-parent">
    <i class="el-icon-back back-style" @click="handleBack"></i>
    <i class="el-icon-refresh refresh-style" @click="$router.go(0)"></i>
  </div>
 </div>
</template>

<script>

const pathToRegexp = require('path-to-regexp')
export default {
  data () {
    return {
      levelList: null,
      formUrl: {}
    }
  },
  watch: {
    $route (to, form) {
      this.formUrl = form
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    handleBack() {
      if (this.formUrl.fullPath) {
        this.$router.push(this.formUrl.fullPath)
      }
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect !== this.$route.path && redirect !== this.$route.meta.perantRedirect) { // 当前路由的path与重定向path不相同才会跳转
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.back-style{
  margin:0 10px;
  cursor:pointer;
}
.refresh-style{
  cursor:pointer;
}
.breadcrumb-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-icon-parent{
  margin-right: 40px;;
}
</style>
