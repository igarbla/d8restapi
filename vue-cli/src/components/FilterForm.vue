<template lang="html">
  <section>
    <header>
      <h1>Filtros de selección</h1>
    </header>
    <form>
      <label for="matricula">Matrícula</label>
      <input
        type="text"
        id="matricula"
        name="matricula"
        v-model="filter.matricula">

      <div>
      <label for="filterColor">Color</label>
      <input
        type="checkbox"
        id="filterColor"
        name="filterColor"
        v-model="filter.filterColor">
      </div>

      <label for="kilometros">Kilómetros: {{ filter.kilometros | formatNumber }} kms</label>
      <input
        type="range"
        id="kilometros"
        name="kilometros"
        min="0"
        max="2000000"
        v-model="filter.kilometros">

      <label for="propietario">Propietario</label>
      <input
        type="text"
        id="propietario"
        name="propietario"
        v-model="filter.propietario">

        <button
          type="button"
          name="button"
          @click.prevent="filterList">Buscar</button>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      filter: {
        matricula: '',
        filterColor: false,
        color: '',
        kilometros: 0,
        propietario: ''
      }
    }
  },
  props: ['list'],
  computed: {
    filteredList () {
      let subset = this.list.filter(item => item.matricula.match(this.filter.matricula))
      // if (filterColor) {
      //   subset = subset.filter(item => item.color == this.filter.color)
      // }
      subset = subset.filter(item => parseInt(item.kilometros) <= this.filter.kilometros)
      subset = subset.filter(item => item.propietario.match(this.filter.propietario))
      return subset
    }
  },
  methods: {
    filterList () {
      this.$emit('filtered', this.filteredList)
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
  }
}
</script>

<style lang="css" scoped>
  section {
    font-family: monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  h1 {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 0.25rem;

    letter-spacing: 1px;
  }
  input {
    margin-bottom: 1rem;
  }
  input[type="range"] {
    width: 100%;
    border: 1px solid #ccc;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    background-color: blue;
    box-shadow: 0px 1px 2px black;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0px 3px 2px black;
  }
  button:active {
    box-shadow: 0px 1px 2px black;
  }
</style>
