<template>
    <div class="form-main-content">
    <form class="form-content" type="submit" @focusout="add()">
        <div class="row">
            <div class="col">
                <input class="form-control add-input" id="new_field_label" type="text" v-model.trim="newLabel" placeholder="Label">
            </div>
            <div class="col">
                <input class="form-control add-input" id="new_field_value" type="number" v-model="newValue" placeholder="value">
            </div>
        </div>
    </form>
    </div>
</template>

<script lang="ts">
import { NewValues } from "../model"

export default {
    name: 'AddField',
    props: {
        addNewField: Function 
    },
    data(): NewValues {
      return {
        newLabel: "",
        newValue: ""
      }
    },
    methods: {
        add: function () {
            if(!this.newLabel || !this.newValue) {
                return
            }
            this.addNewField(this.newLabel, this.newValue)
            this.newLabel = ""
            this.newValue = ""
        }
    }
}
</script>

<style scoped>
.form-main-content{
    display: flex;
    justify-content: center;
}
.form-content {
    width: 550px;
    margin: 10px;
}
.add-input {
    border: solid gray;
    width: 220px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>