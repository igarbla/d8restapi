<template>
  <div class="wrapper">
    <site-header></site-header>
    <main>
      <filter-form
        v-if="searching"
        @filtered="showList($event)"></filter-form>
      <list
        v-if="!searching"
        :list="list"
        :filter="filter"
        @newSearch="searching=true"></list>
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
      //dataLoaded: false,
      searching: true,
      list: [],
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
      this.list = data[0]
      this.filter = data[1]
      this.searching = false
    }
  },
  created () {
    
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
