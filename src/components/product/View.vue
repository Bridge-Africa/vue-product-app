<template>
  <div style="width: 100%;">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ product.name }}
          </h1>
          <h2 class="subtitle">
            {{ product.description }}
          </h2>
          <hr>
          <b-button tag="router-link" :to="{name: 'edit-product', params: {id: product['.key']}}" size="is-large"
                    type="is-dark" icon-pack="el-icon" icon-right="el-icon-edit">Edit</b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {db} from '../../firebase'

export default {
  name: 'ViewProduct',
  data () {
    return {
      product: {}
    }
  },
  firestore () {
    return {
      product: db.collection('products').doc(this.$route.params.id)
    }
  },
  watch: {
    'product' (value) {
      document.querySelector('body').setAttribute('style', `
          background-image: url("${value.image}");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        `)
    }
  },
  methods: {},
  mounted () {
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', `
          background-image: none;
        `)
  }
}
</script>

<style scoped>
  .hero {
    background-color: rgba(255, 255, 255, 0.93);
    border-radius: 5px;
    color: #333;
    line-height: 1.5;
    padding: 1rem 2rem;
  }
</style>
