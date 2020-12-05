<template>
  <div class="pt-5">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="login-text">Login</h3>
            <div class="is-center has-text-danger">
              {{ auth_message }} {{ localStorage.name }}
            </div>
          </div>
          <el-form ref="login" label-position="left"  :model="form" :rules="rules">
            <el-form-item label="Username" prop="username">
              <el-input ref="username" placeholder="Enter your username" v-model="form.username"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
              <el-input ref="password" v-on:keyup.enter="login" type="password" placeholder="Enter your password" v-model="form.password"></el-input>
            </el-form-item>
            <hr>
            <el-form-item>
              <b-button type="is-warning" expanded @click.prevent="login" :loading="loading" icon-right="el-icon-position">
                <strong>Login</strong>
              </b-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      auth_message: '',
      loading: false,
      rules: {
        username: [{required: true, trigger: 'change'}],
        password: [{required: true, trigger: 'change'}]
      }
    }
  },
  computed: {
  },
  methods: {
    login () {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$authService.login(this.form)
            .then(res => {
              this.notify('Login successful', 'Logged in')
              this.localStorage.name = res.name
              this.$router.push({name: 'products'})
            })
            .catch(err => {
              this.notify(err.message, 'Login error', 'error')
            })
            .then(() => (this.loading = false))
        }
      })
    }
  },
  mounted () {
    this.$refs.username.focus()
    if (this.$route.query.username) {
      this.form.username = this.$route.query.username
      this.$refs.password.focus()
    }
  }
}
</script>

<style scoped>
  .login-text {
    text-align: center;
    font-size: 24px;
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    /*background: rgb(121,87,213);
    background: linear-gradient(0deg, rgba(121,87,213,1) 0%, rgba(253,187,45,1) 100%);
    color: white;*/
    font-weight: bold;
  }
</style>
