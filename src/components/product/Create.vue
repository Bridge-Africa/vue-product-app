<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <div class="title has-text-centered">Add Product</div>
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
          <b-button :loading="loading" @click.prevent="create" type="is-success" icon-pack="el-icon" icon-right="el-icon-coin">Add Product</b-button>
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
    <scroll-up/>
  </div>
</template>

<script>
import ScrollUp from 'vue-scroll-up'

export default {
  name: 'CreateProduct',
  components: {
    ScrollUp
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        image: null,
        base64: ''
      },
      loading: false,
      imageName: '',
      dialogResize: false,
      rules: {
        name: [{required: true, trigger: 'blur'}],
        description: [{required: true, trigger: 'blur'}],
        price: [{required: true, type: 'number', trigger: 'blur'}],
        image: [{required: true}]
      }
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
    }
  },
  methods: {
    rotate (rotationAngle) {
      // Rotates the image
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
    create () {
      this.$buefy.dialog.confirm({
        message: 'Continue on this task?',
        onConfirm: () => {
          this.loading = true
          this.$productService.createProduct(Object.assign({}, this.form))
            .then(data => {
              this.displayMessage('Product added successfully', () => {
                this.$router.push({name: 'products'})
              })
            })
            .catch(err => {
              this.notify(err.message, 'Upload error', 'error')
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
