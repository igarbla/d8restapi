<template lang="html">
  <div class="list">
    <header class="list__header">
      <h1>{{ totalItems }} {{ totalItems | pluralize("coche") }} {{ totalItems | pluralize("encontrado") }}</h1>
      <p>Matrícula: {{ this.filter.matricula }}</p>
      <p>Color: <span v-if="this.filter.filterColor">{{ this.filter.color }}</span></p>
      <p>Kilómetros: {{ this.filter.kilometros | formatNumber }} kms.</p>
      <p>Propietario: {{ this.filter.propietario }}</p>
    </header>

    <section class="list__paginator">
      <button
        type="button"
        :disabled="hasPreviousPage !== true"
        @click="previousPage">Anterior</button>
      <div class="list__info">
        <p>Página {{ currentPage }} / {{ totalPages }}</p>
      </div>
      <button
        type="button"
        :disabled="hasNextPage !== true"
        @click="nextPage">Siguiente</button>
    </section>

    <section class="list__content">
      <card
        v-for="item in items"
        :key="item.uuid"
        :item="item"
        class="list__item"></card>
    </section>

    <section class="list__paginator">
      <button
        type="button"
        :disabled="hasPreviousPage !== true"
        @click="previousPage">Anterior</button>
      <div class="list__info">
        <p>Total coches: {{ totalItems }}</p>
        <p>Página {{ currentPage }} / {{ totalPages }}</p>
      </div>
      <button
        type="button"
        :disabled="hasNextPage !== true"
        @click="nextPage">Siguiente</button>
    </section>

  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  data () {
    return {
      numItems: 10,
      currentPage: 1
    }
  },
  components: {
    'card': Card
  },
  props: ['list', 'filter'],
  computed: {
    totalItems () {
      (this.list.length) ? this.currentPage = 1 : this.currentPage = 0
      return this.list.length
    },
    items () {
      let start = (this.currentPage - 1) * this.numItems
      let end = this.currentPage * this.numItems
      return this.list.slice(start, end)
    },
    totalPages () {
      return Math.ceil(this.totalItems / this.numItems)
    },
    hasPreviousPage () {
      return (this.currentPage < 2) ? false : true
    },
    hasNextPage () {
      return (this.currentPage < this.totalPages) ? true : false
    }
  },
  filters: {
    formatNumber(number) {
      console.log(number);
      if (isNaN(number)) {
        return
      }
      let ts = "."
      let reverse = number.toString().split('').reverse().join('')
      let thousands = reverse.match(/\d{1,3}/g)
      let result = thousands.join(ts).split('').reverse().join('')
      return result
    },
    pluralize(count, word) {
      if (count != 1) {
        return word + "s"
      } else {
        return word
      }
    }
  },
  methods: {
    nextPage() {
      this.currentPage++
    },
    previousPage() {
      this.currentPage--
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 1rem;
  font-family: monospace;
}
.list__header {
  padding: 1rem;
  h1 {
    text-align: center;
  }
}
.list__paginator {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}
.list__info {
  text-align: center;
}
.list__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem auto;
  padding: 1rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.list__item {
  margin: .5rem;
  width: 220px;
  word-wrap: break-word;
}
</style>
