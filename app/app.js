const api_base_url = 'http://localhost:8080'

Vue.component('coche', {
  props: ['coche'],
  computed: {
    foto: function () {
      return api_base_url + this.coche.foto
    }
  },
  template: `
    <li class="coche">
      <div class="coche__meta">
        <p>{{ coche.matricula }}</p>
        <p>{{ coche.color }}</p>
        <p>{{ coche.kilometros }} kms</p>
        <p>{{ coche.propietario }}</p>
      </div>
      <img class="coche__foto" v-bind:src="foto">
    </li>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    coches: [],
    loaded: false,
    coches_filtered: [],
    pagina: {
      current: 1,
      numItems: 10,
      items: [],
      next: true,
      previous: false
    },
    colorFilter: false,
    filtro: {
      matricula: '',
      color: '',
      propietario: '',
      kilometros: 0
    }
  },
  computed: {
    total () {
      return this.coches_filtered.length
    },
    paginas () {
      return Math.ceil(this.total / this.pagina.numItems)
    },
    previous () {
      return (this.pagina.current == 1) ? this.pagina.previous = false : this.pagina.previous = true
    },
    next () {
      return (this.pagina.current < this.paginas) ? this.pagina.next = true : this.pagina.next = false
    }
  },
  filters: {
    formatNumber(number) {
      let ts = "."
      let reverse = number.toString().split('').reverse().join('')
      let thousands = reverse.match(/\d{1,3}/g)
      let result = thousands.join(ts).split('').reverse().join('')
      return result
    }
  },
  methods: {
    absoluteUrl(relativeUrl) {
      return api_base_url+relativeUrl
    },
    filterCoches() {
      this.coches_filtered = this.coches.filter(coche => coche.matricula.match(this.filtro.matricula))
      if (this.colorFilter) {
        this.coches_filtered = this.coches_filtered.filter(coche => coche.color.match(this.filtro.color))
      } else {
        this.filtro.color = ''
      }
      this.coches_filtered = this.coches_filtered.filter(coche => coche.propietario.match(this.filtro.propietario))
      this.coches_filtered = this.coches_filtered.filter(coche => parseInt(coche.kilometros) <= this.filtro.kilometros)
      this.pagina.items = this.coches_filtered.slice(0, this.pagina.numItems)
      this.pagina.current = 1
    },
    nextPage() {
      this.pagina.current++
      this.changePage()
    },
    previousPage() {
      this.pagina.current--
      this.changePage()
    },
    changePage () {
      let start = (this.pagina.current - 1) * this.pagina.numItems
      let end = this.pagina.current * this.pagina.numItems
      this.pagina.items = this.coches_filtered.slice(start, end)
    }
  },
  mounted () {
    axios
      .get(api_base_url+'/api/coche')
      .then(response => {
        this.coches = response.data
        this.coches_filtered = this.coches
        this.pagina.items = this.coches_filtered.slice(0, this.pagina.numItems)
        this.loaded = true
        this.filterCoches()
      })
  }
})
