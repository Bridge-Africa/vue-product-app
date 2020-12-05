import CryptoJS from 'crypto-js'
import {db} from '../firebase'
export default class AuthService {
  constructor (router) {
    this.$router = router
    this.key = '82f2ceed4c503896c8a291e560bd4325'
    this.iv = 'lsjdfunalsjklfuae&8s;kas;e'
  }

  encrypt (txt) {
    const cipher = CryptoJS.AES.encrypt(txt, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      mode: CryptoJS.mode.CBC
    })
    return cipher.toString()
  }

  decrypt (txt) {
    const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      mode: CryptoJS.mode.CBC
    })
    return CryptoJS.enc.Utf8.stringify(cipher).toString()
  }

  login (data) {
    return new Promise((resolve, reject) => {
      let pwHash = this.encrypt(data.password)
      db.collection('users')
        .where('username', '==', data.username)
        .where('password', '==', pwHash)
        .get()
        .then((snapshot) => {
          let doc = snapshot.docs.map(d => d.data())
          if (doc.length) {
            resolve(doc[0])
          } else {
            reject(new Error('Invalid username or password'))
          }
        })
    })
  }

  register (data) {
    return new Promise((resolve, reject) => {
      let pwHash = this.encrypt(data.password)
      db.collection('users').where('username', '==', data.username)
        .get()
        .then((snapshot) => {
          let docs = snapshot.docs.map(d => d.data())
          if (docs.length) {
            reject(new Error('Username already taken'))
          } else {
            db.collection('users').add({
              username: data.username,
              password: pwHash,
              name: data.name
            })
            resolve({})
          }
        })
    })
  }

  logout () {
  }
}
