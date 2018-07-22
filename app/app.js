const api_base_url = 'http://localhost:8080'

var app = new Vue({
  el: '#app',
  data: {
    coches: null
  },
  methods: {
    absoluteUrl(relativeUrl) {
      return api_base_url+relativeUrl
    }
  },
  mounted () {
    axios
      .get(api_base_url+'/api/coche')
      .then(response => (this.coches = response.data ))
  }
})
