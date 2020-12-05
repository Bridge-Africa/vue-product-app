<template>
  <div class="pt-5">
    <section class="container">
      <div class="buttons is-centered">
        <b-button tag="router-link" type="is-info" :to="{name: 'create-product'}" icon-pack="el-icon" icon-right="el-icon-plus">Product</b-button>
        <b-button tag="router-link" type="is-dark is-light" :to="{name: 'products'}" icon-pack="el-icon" icon-right="el-icon-tickets">Product List</b-button>
      </div>
      <hr>
    </section>

    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {}
  },
  methods: {},
  mounted () {
  }
}
</script>

<style scoped>

</style>
