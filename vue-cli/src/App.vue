<template>
  <div class="wrapper">
    <site-header></site-header>
    <main>
      <filter-form v-if="dataLoaded" :list="list" @filtered="showList($event)"></filter-form>
      <list v-if="dataLoaded" :list="filteredList"></list>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import FilterForm from './components/FilterForm.vue'
import List from './components/List.vue'

import axios from 'axios'

export default {
  data () {
    return {
      dataLoaded: false,
      list: [],
      filteredList: []
    }
  },
  components: {
    'site-header': Header,
    'filter-form': FilterForm,
    'list': List
  },
  methods: {
    showList(data) {
      this.filteredList = data
    },
    changeComponent (component) {
      this.cmpProps = []
      this.selectedComponent = component
    }
  },
  created () {
    axios
    .get('http://localhost:8080/api/coche')
    .then(response => {
      this.list = response.data
      this.filteredList = this.list
      this.dataLoaded = true
    })
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
