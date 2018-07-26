<template lang="html">
  <div class="card">
    <img
      :src="absoluteUrl"
      class="card__image">
    <div class="card__meta">
      <p>Matrícula: <span>{{ item.matricula}}</span></p>
      <p>Color: <span>{{ item.color }}</span></p>
      <p>Kilómetros: <span>{{ item.kilometros | formatNumber }} kms.</span></p>
      <p>Propietario: <span>{{ item.propietario }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    absoluteUrl () {
      return 'http://localhost:8080' + this.item.foto
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

<style lang="scss">
.card {
  border: solid 1px #ccc;
  //box-shadow: 3px 5px 10px black;
}
.card__image {
  width: 100%;
  height: 200px;
}
.card__meta {
  width: 90%;
  margin: 0.5rem auto;
  p {
    text-transform: uppercase;
    span {
      font-weight: bold;
      text-transform: none;
    }
  }
}
</style>
