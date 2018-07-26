<template lang="html">
  <div class="list">
    <header class="list__header">
      <h1>{{ totalItems }} {{ totalItems | pluralize("coche") }} {{ totalItems | pluralize("encontrado") }}</h1>
      <div class="list__meta">
        <p>Matrícula: <span>{{ this.filter.matricula }}</span></p>
        <p>Color: <span v-if="this.filter.filterColor">{{ this.filter.color }}</span></p>
        <p>Kilómetros: <span>{{ this.filter.kilometros | formatNumber }} kms.</span></p>
        <p>Propietario: <span>{{ this.filter.propietario }}</span></p>
      </div>
      <button type="button" name="button" @click="$emit('newSearch')">Nueva búsqueda</button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  font-family: monospace;
}
.list__header {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
  h1 {
    margin-bottom: 1rem;
  }
}
.list__meta {
  margin-bottom: 1rem;
  p {
    span {
      font-weight: bold;
    }
  }
}
.list__paginator {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}
.list__info {
  text-align: center;
}
.list__content {
  width: 100%;
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
