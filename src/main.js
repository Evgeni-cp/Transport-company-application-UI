import { createApp } from 'vue'
import App from './App.vue'
import router from '@/utils/Router'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import {key} from "../keys/GmapKey";
import VueApexCharts from "vue3-apexcharts";
import VueResizeObserver from "vue-resize-observer";

const app = createApp(App);
app.use(router);
app.use(VueGoogleMaps, {
    load:{
        key: key
    }
});
app.use(VueResizeObserver);
app.use(VueApexCharts);
app.mount('#app');