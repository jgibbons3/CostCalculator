<template>
  <h2 class="app-title">Price Components</h2>
  <h5 class="total-wrapper"> Total:  {{ totalRequest }} EUR/KG</h5>
  <Fields :fields=fields />
  <AddField :addNewField="addNewField" />
</template>

<script lang="ts">
import Fields from './components/Fields.vue'
import AddField from './components/AddField.vue'

interface IField {
  field_name: string
  amount: number
}

interface IFields {
  fields: IField[]
}

export default {
  name: 'App',
  components: {
    Fields,
    AddField
  },
  data(): IFields {
    return {
      fields: [
        {field_name: 'baseprice', amount: 1},
        {field_name: 'Scrap', amount: 0.42},
        {field_name: 'Energy', amount: 0.1587},
        {field_name: 'Energy surcharge', amount: 0.15}
      ]
    }
  },
  computed: {
    totalRequest() {
      console.log(this.fields)
      return (this.fields.reduce((acc:number, item: IField) => acc + item.amount, 0)).toFixed(2);
    }
  },
  methods: {
    addNewField: function (newLabel:string, newValue: string) {
      if (newLabel.length <= 1) {
        return
      } 
      const number = Number(newValue)
      if (isNaN(number)) {
        return
      }
      if (number < 0) {
        return
      }

      this.fields.push({field_name: newLabel, amount: number})
    }, 
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: black
}
.app-title {
  margin: 30px 0 20px;
}
.total-wrapper {
  margin: 10px 0;
}
</style>