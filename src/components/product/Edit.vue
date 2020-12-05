<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <el-row class="is-centered has-text-centered">
        <el-image lazy v-if="productImageVisible" style="width: 100px; height: 100px;" :src="form.base64" fit="cover">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="title has-text-centered">
          {{ product.name }}
        </div><hr>
      </el-row>
      <section>
        <b-field>
          <b-input ref="nameField" v-model="form.name" placeholder="Product Name" type="text"></b-input>
        </b-field>

        <b-field>
          <b-input v-model="form.price" placeholder="Unit Price" type="number" min="10"></b-input>
        </b-field>

        <b-field>
          <b-input v-model="form.description" type="textarea" minlength="5" placeholder="Product Description (max 45 chars)">
          </b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="form.image" expanded>
            <a class="button is-primary">
              <b-icon pack="el-icon" icon="el-icon-upload"></b-icon>
              <span>{{ (form.image && form.image.name) ? form.image.name : "Click to upload"}}</span>
            </a>
          </b-upload>
        </b-field>
        <b-field class="is-pulled-right">
          <b-button :loading="loading" @click.prevent="update" type="is-success" icon-pack="el-icon" icon-right="el-icon-coin">Update Product</b-button>
        </b-field>
      </section>
    </div>
    <div class="column"></div>
    <b-modal v-model="dialogResize" has-modal-card
             trap-focus
             :destroy-on-hide="false"
             aria-role="dialog"
             aria-modal>
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            Image Editor
          </p>
        </div>
        <div class="card-content">
          <div style="display:flex; justify-content: space-between">
            <div style="display:flex; flex-direction:column;margin-right:50px;">
              <div class="buttons">
                <b-button @click="rotate(-90)" icon-pack="el-icon" icon-right="el-icon-refresh-right">Rotate </b-button>
                <b-button @click="rotate(90)" icon-pack="el-icon" icon-right="el-icon-refresh-left">Rotate </b-button>
              </div>
            </div>
            <vue-croppie
              ref="croppieRef"
              :enableOrientation="false"
              :boundary="{ width: 1280, height: 920}">
            </vue-croppie>
          </div>
        </div>
        <footer class="card-footer">
          <b-button class="card-footer-item" @click.prevent="closeDialog(true)" icon-pack="el-icon" icon-right="el-icon-check" type="is-info">Save</b-button>
          <b-button class="card-footer-item" @click.prevent="closeDialog(false)" icon-pack="el-icon" icon-right="el-icon-close" type="is-danger">Cancel</b-button>
        </footer>
      </div>

    </b-modal>
  </div>
</template>

<script>
import {db} from '../../firebase'
import moment from 'moment'

export default {
  name: 'EditProduct',
  data () {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        image: null,
        base64: ''
      },
      product: {},
      loading: false,
      imageName: '',
      dialogResize: false,
      productImageVisible: false,
      rules: {
        name: [{required: true, trigger: 'blur'}],
        description: [{required: true, trigger: 'blur'}],
        price: [{required: true, type: 'number', trigger: 'blur'}],
        image: [{required: true}]
      }
    }
  },
  firestore () {
    return {
      product: db.collection('products').doc(this.$route.params.id)
    }
  },
  watch: {
    'form.image' (file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        this.dialogResize = true
        this.form.base64 = e.target.result
        setTimeout(() => {
          this.$refs.croppieRef.bind({
            url: e.target.result
          })
        }, 100)
      }

      reader.readAsDataURL(file) // convert to base64 string
    },
    product (value) {
      this.form.name = value.name
      this.form.description = value.description
      this.form.price = value.unit_price
      this.form.base64 = value.image
      setTimeout(() => {
        this.productImageVisible = true
      }, 100)
    }
  },
  methods: {
    rotate (rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    },
    closeDialog (accept) {
      if (accept) {
        let options = {
          format: 'png',
          circle: false
        }
        this.$refs.croppieRef.result(options, (output) => {
          this.form.base64 = output
        })
      }
      this.dialogResize = false
    },
    update () {
      this.$buefy.dialog.confirm({
        message: 'Continue on this task?',
        onConfirm: () => {
          this.loading = true
          let data = {
            name: this.form.name,
            description: this.form.description,
            unit_price: this.form.price,
            image: this.form.base64,
            updated_at: moment().toLocaleString()
          }
          this.$productService.updateProduct(this.product['.key'], data)
            .then(() => {
              this.$buefy.dialog.confirm({
                message: 'Product updated successfully',
                onConfirm: () => this.$router.push({name: 'products'})
              })
            })
            .catch(err => {
              this.notify(err.message, 'Update error', 'error')
            })
            .then(() => (this.loading = false))
        }
      })
    }
  },
  mounted () {
    this.$refs.nameField.focus()
  }
}
</script>

<style scoped>
  form {
    width: 100%;
    padding-top: 15px;
  }
</style>
