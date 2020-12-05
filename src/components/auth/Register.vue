<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="signup-text">Sign Up</h3>
          </div>
          <el-form ref="signup" label-position="top" label-width="100px" :model="form" :rules="rules">
            <el-form-item label="Name" prop="name">
              <el-input ref="name" placeholder="Enter your full name" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Username" prop="username">
              <el-input placeholder="Choose a username (login)" v-model="form.username"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
              <el-input v-on:keyup.enter="register" type="password" placeholder="Enter a password >= 6 chars" v-model="form.password"></el-input>
            </el-form-item>
            <hr>
            <el-form-item>
              <b-button icon-pack="el-icon" expanded icon-right="el-icon-position" type="is-primary" @click.prevent="register" :loading="loading">
                <strong>Complete Sign Up</strong>
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
  name: 'register',
  data () {
    return {
      form: {
        name: 'Mathew',
        username: 'levi',
        password: 'secret'
      },
      auth_message: '',
      loading: false,
      rules: {
        name: [{required: true, trigger: 'change'}],
        username: [{required: true, trigger: 'change'}],
        password: [{required: true, trigger: 'change'}, {min: 6, trigger: 'change'}]
      }
    }
  },
  methods: {
    register () {
      this.$refs.signup.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$authService.register(Object.assign({}, this.form))
            .then(res => {
              this.$notify({
                title: 'Success',
                message: 'Successfully signed up',
                type: 'success'
              })
              this.$router.push({
                name: 'login', query: {username: this.form.username}
              })
            })
            .catch(err => {
              this.$notify({
                title: 'Sign Up Error',
                message: err.message,
                type: 'error'
              })
            })
            .then(() => (this.loading = false))
        }
      })
    }
  },
  mounted () {
    this.$refs.name.focus()
  }
}
</script>

<style scoped>
  .f-w {
    width: 100%;
  }
  .signup-text {
    text-align: center;
    font-size: 24px;
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
   /* background: rgb(121,87,213);
    background: linear-gradient(0deg, rgba(121,87,213,1) 0%, rgba(253,187,45,1) 100%);
    color: white;*/
    font-weight: bold;
  }
</style>
