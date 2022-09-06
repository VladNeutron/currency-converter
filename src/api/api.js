import axios from "axios";
const BASEURL = 'https://openexchangerates.org/api/'
const APIKEY = '?app_id=0599a70868594a62b638ec3373e95a9e'

export function getCurrencyList(){
    let url = BASEURL+'currencies.json'+APIKEY
    return axios.get(url)
}

export function getCurrencyRates(){
    let url = BASEURL+'latest.json'+APIKEY
    return axios.get(url)
}

export function getLocation(){
    return axios.get('ipinfo.io/66.87.125.72/json?token=6e2d6608a3547e')
}