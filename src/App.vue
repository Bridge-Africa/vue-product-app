<template>
  <div id="app">
    <template>
      <b-navbar fixed-top type="is-dark">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="https://bridgeafrica.com/wp-content/uploads/2017/09/Bridge-Africa-Logo-05.png"
              alt="Bridge Africa">
          </b-navbar-item>
        </template>
        <template slot="start">

        </template>

        <template slot="end">
          <b-navbar-item tag="div">
            <div class="buttons" v-if="!localStorage.name">
              <b-button type="is-primary" tag="router-link" :to="{name: 'register'}">
                <strong>Sign up</strong>
              </b-button>
              <b-button type="is-warning" tag="router-link" :to="{name: 'login'}" >
                <strong>Log in</strong>
              </b-button>
            </div>
            <b-navbar-dropdown :label="localStorage.name" v-else>
            <b-navbar-item @click.prevent="logout" >
              Logout &nbsp; <span class="el-icon-switch-button"></span>
            </b-navbar-item>
          </b-navbar-dropdown>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>
    <transition name="slide-fade" is="div" class="app-box">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.localStorage.name = ''
      this.$router.push({name: 'login'})
    }
  },
  mounted () {
  }
}
</script>

<style>
  .app-box {
    margin-top: 40px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
