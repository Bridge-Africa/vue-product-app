<template>
  <div class="section">
    <div class="container">
      <div class="columns is-multiline is-mobile is-centered is-desktop">
        <div class="column is-one-quarter-desktop is-two-thirds-mobile is-two-fifths-tablet" v-for="(product) in products" :key="product.name">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="product.image" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="title has-text-centered">
                <b-tooltip :active="product.name.length > 15" :label="product.name"
                           position="is-bottom" animated type="is-dark">
                  {{ product.name | trim(15) }}
                </b-tooltip>
              </div>
              <b-tag rounded type="is-primary" class="subtitle is-pulled-right price-tag">{{ product.unit_price | currency }}</b-tag>
              <div class="content">
                <b-tooltip multilined :active="product.description.length > 20" :label="product.description"
                           position="is-top" animated type="is-dark">
                  {{ product.description | trim(20) }}
                </b-tooltip>
                <br>
                <time :datetime="product.created_at">{{ product.created_at | calendar }}</time>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <b-button tag="router-link" :to="{name: 'edit-product', params: {id: product['.key']}}" class="is-text">Edit</b-button>
                <b-button tag="router-link" :to="{name: 'view-product', params: {id: product['.key']}}" class="is-text">View</b-button>
                <b-button class="is-text has-text-danger" @click.prevent="deleteProduct(product)">Delete</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-up/>
  </div>
</template>

<script>
import {db} from '../../firebase'
import ScrollUp from 'vue-scroll-up'

export default {
  name: 'Index',
  components: {
    ScrollUp
  },
  data () {
    return {
      products: [],
      loading: false
    }
  },
  firestore: {
    products: db.collection('products')
  },
  methods: {
    deleteProduct (product) {
      this.$buefy.dialog.confirm({
        title: `Deleting ${product.name}`,
        message: 'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
        confirmText: `Delete product '${product.name}'`,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$productService.deleteProduct(product['.key'])
            .then(data => {
              this.$buefy.toast.open('Product deleted!')
            })
        }
      })
    }
  },
  mounted () {
  },
  beforeMount () {
    this.pageLoading = true
  }
}
</script>

<style scoped>
  .price-tag {
    position: absolute;
    top: 30px;
    right: 8px;
  }
  .title {
    font-size: 1.2rem;
  }
</style>
