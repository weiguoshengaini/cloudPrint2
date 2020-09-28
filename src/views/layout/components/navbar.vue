<template>
  <div class="navbar">
    <!-- <Hamburger :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" /> -->
    <div class="right-menu">
      <div class="right-menu-first">
        <el-badge :value="200" :max="99" class="item">

          <div style="padding:5px">
           <i class="el-icon-close-notification"></i> 代办事项
          </div>
        </el-badge>
      </div>
      <div class="right-menu-first">
        <el-badge :value="200" :max="99" class="item">
          <div style="padding:5px">
            <i class="el-icon-close-notification"></i> 消息
          </div>
        </el-badge>
      </div>
      <div>
      <el-dropdown class="avatar-container"
                   trigger="click">
        <div class="avatar-wrapper">
          <img :src="require('@icons/user_info.png')"
               class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"
                          class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided
                            @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
.right-menu {
  float: right;
  height: 100%;
  // line-height: 50px;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
  }
  .right-menu-first{
    // height: 30px;
    margin-right: 35px;;
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
