<template>
  <div id="fields">
    <FieldCard v-for="(field, index) in fields" :index="index" 
      :key="field" :field="field" :deleteField="deleteField" />
  </div>
</template>
<script lang="ts">
  import FieldCard from './FieldCard.vue' 

  export default {
    name: 'Fields',
    components: {
      FieldCard,
    },
    props:['fields'],

    methods: {
      deleteField: function (index: number) {
        this.fields.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
#fields {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>