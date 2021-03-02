<template>
    <div class="field-card" @mouseenter="enter(index)" @mouseleave="leave" >
        <div v-if="editLabel"> 
            <input class="form-control input-value" type="text" v-model.trim="message" v-focus 
            @focusout="clickOutsideEdit(message, index)" >
        </div>
        <div class="label_field" v-else> 
            {{ field.field_name }}
        </div>
        <button type="button" class="btn btn-secondary edit-button" 
            :style="{visibility: displayIcon ? 'visible' : 'hidden'}" 
            v-on:click="editLabelEvent(index)">edit</button>
        
        <div v-if="editValue"> 
            <input class="form-control input-value" type="number" v-model.trim="message_value" v-focus 
            @focusout="clickOutsideEditValue(message_value, index)" >
        </div>
        <div v-else v-on:click="editValueEvent(index)"> 
            <input class="form-control input-value" v-model="roundAmountField">
        </div>  

        <button type="button" class="btn btn-secondary delete-button" :style="{visibility: displayIcon ? 'visible' : 'hidden'}"
        v-on:click="deleteField(index)">X</button>
    </div>
</template>

<script lang="ts">

interface FieldCard {
    displayIcon: boolean,
    editLabel: boolean,
    editValue: boolean,
    message: string,
    message_value: string,
  }

export default {
    name: 'FieldCard',
    
    props:['index', 'field', 'deleteField'],
    data(): FieldCard {
      return {
        displayIcon: false,
        editLabel: false,
        editValue: false,
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
                this.displayIcon = true
            } 
        },
        leave: function() {
            this.displayIcon = false
        },
        editLabelEvent: function() {
            this.editLabel = true
        },
        editValueEvent: function() {
            this.editValue = true
        },
        clickOutsideEdit: function(value: string) {
            if(value.length > 1) {
                this.field.field_name = value
            }
            this.editLabel = false
        },
        clickOutsideEditValue: function(value: string) {
            if(value.length <= 0) {
                this.field.amount = 0.0
            } 
            else if (value !== this.field.amount){
                this.field.amount = parseFloat(value)
            }
            this.editValue = false
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