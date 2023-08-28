import './assets/main.scss'

import VIntersection from './directives/VIntersection'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)

app.component('InputText', InputText)
app.component('Card', Card)
app.component('ProgressSpinner', ProgressSpinner)

app.directive('intersection', VIntersection)

app.mount('#app')
