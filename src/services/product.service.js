import {db} from '../firebase'
import moment from 'moment'
export default class ProductService {
  constructor (router) {
    this.$router = router
  }

  createProduct (data) {
    return new Promise((resolve, reject) => {
      db.collection('products').add({
        name: data.name,
        description: data.description,
        unit_price: data.price,
        image: data.base64,
        created_at: moment().toLocaleString()
      })
      resolve()
    })
  }

  deleteProduct (id) {
    return new Promise((resolve, reject) => {
      db.collection('products').doc(id).delete()
      resolve()
    })
  }

  updateProduct (id, data) {
    return new Promise((resolve, reject) => {
      db.collection('products').doc(id).set(data).then(() => {
        resolve()
      })
    })
  }
}
