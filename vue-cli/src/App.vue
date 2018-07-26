<template>
  <div class="wrapper">
    <site-header></site-header>
    <main>
      <div v-if="!dataLoaded" class="loading">
        <h1>Loading ...</h1>
      </div>
      <filter-form
        v-if="dataLoaded"
        :list="list"
        @filtered="showList($event)"></filter-form>
      <list
        v-if="dataLoaded"
        :list="filteredList"
        :filter="filter"></list>
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
      filteredList: [],
      filter: {}
    }
  },
  components: {
    'site-header': Header,
    'filter-form': FilterForm,
    'list': List
  },
  methods: {
    showList(data) {
      //console.log(data)
      this.filteredList = data[0]
      this.filter = data[1]
    }
  },
  created () {
    axios
    .get('http://localhost:8080/api/coche')
    .then(response => {
      this.list = response.data
      //this.filteredList = this.list
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
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 116px);
  }
</style>
