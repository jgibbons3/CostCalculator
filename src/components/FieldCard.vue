<template>
    <div class="field-card" @mouseenter="enter(index)" @mouseleave="leave" >
        <div v-if="editLabel"> 
            <input class="form-control input-value" type="text" v-model.trim="label" v-focus 
            @focusout="clickOutsideEditLabel()" >
        </div>
        <div class="label_field" v-else> 
            {{ field.field_name }}
        </div>
        
        <button type="button" class="btn btn-secondary edit-button" 
            :style="{visibility: displayIcon ? 'visible' : 'hidden'}" 
            v-on:click="editLabelEvent()">edit</button>
        
        <div> 
            <input class="form-control input-value" type="number" v-model="roundAmountField"
            v-on:click="editValueEvent()"
            @focusout="clickOutsideEditValue()">
        </div>

        <button type="button" class="btn btn-secondary delete-button" 
            :style="{visibility: displayIcon ? 'visible' : 'hidden'}"
            v-on:click="deleteField(index)">X</button>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { IField, FieldCard } from "../model"

export default {
    name: 'FieldCard',
    
    props: {
        index: Number, 
        field: Object as PropType<IField>, 
        deleteField: Function
    },
    data(): FieldCard {
      return {
        displayIcon: false,
        editLabel: false,
        editValue: false,
        label: this.field.field_name,
      }
    },
    computed: {
      roundAmountField: {
        get(): number {
            if (this.editValue) {
                return this.field.amount
            }
            if (this.field.amount % 1 === 0){
                return this.field.amount.toFixed(1);
            }
            return this.field.amount.toFixed(2);
        },
        set(value: string) {
            let v = parseFloat(value)
            if (isNaN(v)) {
                v = 0.0
            }
            this.field.amount = v
        } 
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
        clickOutsideEditLabel: function() {
            if (this.label.length > 1) {
                this.field.field_name = this.label
            }
            this.editLabel = false
        },
        clickOutsideEditValue: function() {
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