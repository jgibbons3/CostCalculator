<template>
    <div class="field-card" @mouseenter="enter(index)" @mouseleave="leave" >
        <div v-if="addInput === index"> 
            <input class="form-control input-value" type="text" v-model.trim="message" v-focus 
            @focusout="clickOutsideEdit(message, index)" >
        </div>
        <div class="label_field" v-else> 
            {{ field.field_name }}
        </div>
        <button type="button" class="btn btn-secondary edit-button" :style="{visibility: displayIconEdit ? 'visible' : 'hidden'}" 
        v-on:click="addInputElement(index)">edit</button>
        

        <div v-if="addInputValue === index"> 
            <input class="form-control input-value" type="number" v-model.trim="message_value" v-focus 
            @focusout="clickOutsideEditValue(message_value, index)" >
        </div>
        <div v-else v-on:click="editFieldValue(index)"> 
            <input class="form-control input-value" v-model="roundAmountField">
        </div>  

        <button type="button" class="btn btn-secondary delete-button" :style="{visibility: displayIcon ? 'visible' : 'hidden'}"
        v-on:click="deleteField(index)">X</button>
    </div>
</template>

<script lang="ts">

interface FieldCard {
    displayIcon: boolean,
    displayIconEdit: boolean,
    message: string,
    message_value: string
  }

export default {
    name: 'FieldCard',
    
    props:['index', 'field', 'deleteField', 'addInputElement', 'addInput', 'clickOutsideEdit', 'editFieldValue', 
    'addInputValue', 'clickOutsideEditValue'],
    data(): FieldCard {
      return {
        displayIcon: false,
        displayIconEdit: false,
        message: this.field.field_name,
        message_value: this.field.amount,
      }
    },
    computed: {
      roundAmountField() {
        if(this.$props.field.amount % 1 === 0){
            return this.$props.field.amount.toFixed(1);
        }
        return this.$props.field.amount.toFixed(2);
      }
    },
    methods: {
        enter: function(index: number) {
            if(index !== 0){
                this.displayIconEdit = true
                this.displayIcon = true
            } 
        },
        leave: function() {
            this.displayIcon = false
            this.displayIconEdit = false
        }
    }
}
</script>

<style scoped>
.field-card {
    display: flex;
    width: 550px;
    margin: 10px;
    justify-content: space-between;
}
.label_field {
    width: 245px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.edit-button {
    margin-right: 5px;
    height: 42px;
}
.delete-button {
    margin-left: 5px;
    height: 42px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.input-value {
    border: solid black;
    width: 220px;
}
</style>