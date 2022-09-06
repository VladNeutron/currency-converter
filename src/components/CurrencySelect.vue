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
            if(this.currencyList.hasOwnProperty(this.inputCurrency)){
                this.currentCurrency = this.inputCurrency
                this.$emit('changeCurrency', this.currentCurrency)
            }
            else{
                alert('Wrong currency name!')
            }
        },
        getLocationApp(){
            var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country";
            var token = "c5190f2f47c35ecf0f6b5498d3a1d1433a930ccc";
            var query = "ru";

            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: query})
            }

            fetch(url, options)
            .then(response => response.text())
            .then(result =>{
                console.log(JSON.parse(result).suggestions[0].data['alfa2'])
                this.country = JSON.parse(result).suggestions[0].data['alfa2']
                if(this.codesList.hasOwnProperty(this.country)){
                    this.currentCurrency = this.codesList[this.country]
                    this.$emit('changeCurrency', this.currentCurrency)
                }
            } 
            )
            .catch(error => console.log("error", error));
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