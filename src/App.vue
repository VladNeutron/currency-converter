<template>
  <h1>Конвертер валют</h1>
  <div class="row">
    <div class="col-6">
      <CurrencySelect 
        :currencyList="currencyList" 
        :title="'Базовая валюта'"
        @changeCurrency="changeBaseCurrency"
        >
      </CurrencySelect>
      <CurrencySelect 
        :currencyList="currencyList" 
        :title="'Целевая валюта'"
        @changeCurrency="changeAimCurrency"
        >
      </CurrencySelect>
    </div>
    <div class="col-6 text-start">
      <label for="basic-url" class="form-label">Введите сумму перевода</label>
      <div class="input-group mb-3" style="width: 60%;">
        <input 
          type="number" 
          class="form-control" 
          id="basic-url" 
          aria-describedby="basic-addon3"
          v-model="userInput"
          >
      </div> 
      <h3>Результат: {{ sum }}</h3>
    </div>
  </div>
  
</template>

<script>
import CurrencySelect from './components/CurrencySelect.vue';
import { getCurrencyList, getCurrencyRates, getLocation } from './api/api'

export default {
  data(){
    return {
      baseCurrency: '',
      aimCurrency: '',
      userInput: 0,
      currencyList: {
        USD : 'USA',
        RUB : 'Russia',
      },
      ratesList: {},
      request: {},
      country: '',
    }
  },
  methods: {
    changeBaseCurrency(cur){
      this.baseCurrency = cur
    },
    changeAimCurrency(cur){
      this.aimCurrency = cur
    },
  },
  name: 'App',
  components: {
    CurrencySelect,
  },
  mounted(){

    getCurrencyList().then( response => {
      this.currencyList = response.data
      console.log(response.data);
    });
    getCurrencyRates().then( response => {
      console.log(response.data);
      this.ratesList = response.data.rates;
    });

    // if ( Object.keys(navigator.geolocation).length > 0 ) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       console.log(position)
    //     });
    //   } else {
    //     alert('Allow access to your location, to get currency for your region')
    //   }

     


    
    //В бесплатной версии API к сожалению ограничено количество запросов в месяц, в связи с этим курс получаю только один раз
    //В ином случае отправлял бы запросы через setInterval, раз в какое-то время, лиюо же при смене валют+изменении значения пользовательского инпута
    
  },
  computed: {
    rate(){
      if(this.baseCurrency != '' && this.aimCurrency != '' && Object.keys(this.ratesList).length != 0){
        return this.ratesList[this.aimCurrency]/this.ratesList[this.baseCurrency]
      }
      else{
        return 0
      }
    },
    sum(){
      if(this.rate != 0){
        return this.rate*this.userInput
      }
      else{
        return 0
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
