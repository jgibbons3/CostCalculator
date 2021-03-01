<template>
  <div id="fields">
    <FieldCard v-for="(field, index) in fields" :index="index" :key="index" :field="field" :deleteField="deleteField"
    :addInputElement="addInputElement" :addInput="addInput" :clickOutsideEdit="clickOutsideEdit" 
    :editFieldValue="editFieldValue" :addInputValue="addInputValue" :clickOutsideEditValue="clickOutsideEditValue" />
  </div>
</template>
<script lang="ts">
  import FieldCard from './FieldCard.vue' 

  interface AddInput {
    addInput: boolean,
    addInputValue: boolean
  }

  export default {
    name: 'Fields',
    components: {
      FieldCard,
    },
    props:['fields'],
    data(): AddInput {
      return {
        addInput: false,
        addInputValue: false
      }
    },
    methods: {
      deleteField: function (index: number) {
        this.addInput = false
        this.fields.splice(index, 1)
      },
      addInputElement: function(index: number) {
        this.addInput = index
      },
      clickOutsideEdit: function(value: string, index: number) {
        if(value.length > 1) {
          this.fields[index].field_name = value
        }
        this.addInput = false
      },
      editFieldValue: function(index: number) {
        this.addInputValue = index
      },
      clickOutsideEditValue: function(value: string, index: number){
        if(value.length <= 0) {
          this.fields[index].amount = 0.0
        } 
        else if (value !== this.fields[index].amount){
          this.fields[index].amount = parseFloat(value)
        }
        this.addInputValue = false
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