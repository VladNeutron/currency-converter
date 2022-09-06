<template>
  <label for="basic-url" class="form-label"> {{title}} </label>
    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3">{{ currentCurrency == '' ? 'Валюта не выбрана' :currentCurrency }}</span>
        <input 
            type="text" 
            class="form-control" 
            id="basic-url" 
            aria-describedby="basic-addon3"
            v-model="inputCurrency"
            @keyup.enter="selectCurrency"
        >
        <button class="btn btn-success"
            @click="selectCurrency"
        >
            Выбрать
        </button>
    </div> 
</template>

<script>
import {codesToCountries} from '@/api/codes'

export default {
    data(){
        return {
            inputCurrency: '',
            currentCurrency: '',
            country: '',
            codesList: {},
        }
    },
    props: {
        title: String,    
        currencyList: Object,
    },
    emits:{
        changeCurrency: null,
    },
    methods: {
        selectCurrency(){
            if(this.currencyList.hasOwnProperty(this.inputCurrency.toUpperCase())){
                this.currentCurrency = this.inputCurrency.toUpperCase()
                this.$emit('changeCurrency', this.currentCurrency.toUpperCase())
                this.inputCurrency = ''
            }
            else{
                alert('Wrong currency name!')
                this.inputCurrency = ''
            }
        },
        getLocationApp(){
            fetch("https://ipinfo.io/json?token=6e2d6608a3547e").then(
            (response) => response.json()
            ).then(
            (jsonResponse) => {
                console.log(jsonResponse.ip, jsonResponse.country)
                this.country = jsonResponse.country
                if(this.codesList.hasOwnProperty(this.country)){
                    this.currentCurrency = this.codesList[this.country]
                    this.$emit('changeCurrency', this.currentCurrency)
                }
            }
            )
        },
        },
    mounted(){
        if(this.title=='Базовая валюта'){
            this.codesList = codesToCountries();
            this.getLocationApp();
        }
    }
}
</script>

<style>

</style>