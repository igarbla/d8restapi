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
            value="blanco"
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
              value="gris"
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
          value="rojo"
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
        kilometros: 2000000,
        propietario: ''
      }
    }
  },
  props: ['list'],
  computed: {
    filteredList () {
      let subset = this.list.filter(item => item.matricula.match(this.filter.matricula))
      if (this.filter.filterColor) {
        subset = subset.filter(item => item.color == this.filter.color)
      }
      subset = subset.filter(item => parseInt(item.kilometros) <= this.filter.kilometros)
      subset = subset.filter(item => item.propietario.match(this.filter.propietario))
      return subset
    }
  },
  methods: {
    filterList () {
      this.$emit('filtered', [this.filteredList, this.filter])
    },
    resetColor () {
      if (!this.filter.filterColor) {
        this.filter.color = 'blanco'
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
    width: 320px;
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
