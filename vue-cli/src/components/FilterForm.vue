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
        ref="matricula"
        v-model="filter.matricula">

      <div>
        <label for="filterColor">Color</label>
        <input
          type="checkbox"
          id="filterColor"
          name="filterColor"
          v-model="filter.filterColor"
          @change="resetColor">
      </div>
      <fieldset v-if="filter.filterColor">
        <div>
          <label for="blanco" title="Blanco">
            <div class="color blanco"></div>
            Blanco</label>
          <input
            id="blanco"
            type="radio"
            name="color"
            value="white"
            v-model="filter.color">
        </div>
        <div>
          <label for="gris" title="Gris">
            <div class="color gris"></div>
            Gris</label>
            <input
              id="gris"
              type="radio"
              name="color"
              value="gray"
              v-model="filter.color">
        </div>
        <div>
          <label for="rojo" title="Rojo">
            <div class="color rojo"></div>
            Rojo</label>
        <input
          id="rojo"
          type="radio"
          name="color"
          value="red"
          v-model="filter.color">
        </div>
      </fieldset>

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
          type="submit"
          name="button"
          @click.prevent="search">Buscar</button>
    </form>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      filter: {
        matricula: null,
        filterColor: false,
        color: null,
        kilometros: 0,
        propietario: null
      },
      list: []
    }
  },
  methods: {
    search () {
      let url = 'http://localhost:8080/api/coche?'
      let filter = []
      if (this.filter.matricula) {
        filter.push('matricula=' + this.filter.matricula)
      }
      if (this.filter.color) {
        filter.push('color=' + this.filter.color)
      }
      if (this.filter.kilometros) {
        filter.push('kms=' + this.filter.kilometros)
      }
      if (this.filter.propietario) {
        filter.push('propietario=' + this.filter.propietario)
      }
      filter = filter.filter(item => item)
      filter = filter.join('&')
      url += filter
      console.log(url)
      axios
      .get(url)
      .then(response => {
        this.list = response.data
        console.log(this.list)
        this.$emit('filtered', [this.list, this.filter])
      })
    },
    resetColor () {
      if (!this.filter.filterColor) {
        this.filter.color = 'white'
      }
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
  mounted () {
    this.$refs.matricula.focus()
  }
}
</script>

<style lang="scss" scoped>
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
    width: 300px;
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
  fieldset {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    padding: 1rem;
    div {
      display: flex;
      justify-content: space-between;
    }
    label, input {
      margin: 0;
    }
    .color {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 1px solid #333;
      border-radius: 50%;
    }
    .blanco {
      background-color: white;
    }
    .gris {
      background-color: gray;
    }
    .rojo {
      background-color: red;
    }
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
