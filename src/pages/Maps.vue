<template>
  <gmap-map
    id="map"
    :center="center"
    :zoom="5"
    map-type-id="terrain"
    :options="options"
  >
    <gmap-marker
      v-for="(marker, index) in markers"
      :key="index"
      :position="getPosition(marker.coords)"
      :icon="mapMarkers(marker.type)"
    >
    </gmap-marker>
  </gmap-map>
</template>
<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import { API_KEY } from "./Maps/API_KEY";
import { mapGetters } from "vuex";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import MapOptionsMixin from "../mixins/map_options";

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
  },
});

export default {
  mixins: [MapOptionsMixin],
  components: {
    "gmap-custom-marker": GmapCustomMarker,
  },
  data() {
    return {
      center: {
        lat: 39.4296413,
        lng: -84.5117321,
      },
      markers: [],
    };
  },
  computed: {
    ...mapGetters(["mapData", "getDispatches"]),
  },
  methods: {
    markDispatches() {
      let index = 0;
      // Time for the setinterval to run on
      const time = this.getDispatches.length * 2 * 1000;

      const handler = setInterval(() => {
        index++;

        const statuses = ["info", "info", "primary", "danger", "warning"];
        console.log(this.markers);
        this.markers.push(this.getDispatches[index]);
      }, 2000);

      setTimeout(() => {
        clearInterval(handler);
      }, time);
    },

    getPosition(marker) {
      // console.log(marker);
      let lat = parseFloat(marker.lat);
      let lng = parseFloat(marker.lng);
      return {
        lat,
        lng,
      };
    },

    mapMarkers(type) {
      const labels = {
        paid:
          "https://dw-iconusers.flaticon.com/38851/38851999/1616597646084.svg?token=exp=1616598567~hmac=5aea73de43a5143105797735dfa79bf6",
        errorPaid:
          "https://dw-iconusers.flaticon.com/38851/38851999/1616597634361.svg?token=exp=1616598620~hmac=009f3a19f8ea8300228449815205ff56",
        label:
          "https://dw-iconusers.flaticon.com/38851/38851999/1616597696226.svg?token=exp=1616598620~hmac=2a15f4e88c7baed05bfee52017317b13",
        errorLabel:
          "https://dw-iconusers.flaticon.com/38851/38851999/1616597771259.svg?token=exp=1616598757~hmac=53f74ca91a54ac54350cf0ac6a625513",
      };

      const options = {
        url: labels[type],
        size: { width: 60, height: 90, f: "px", b: "px" },
        scaledSize: { width: 30, height: 45, f: "px", b: "px" },
      };

      return options;
    },
  },
  created() {
    this.markDispatches();
  },
};
</script>
<style>
#map {
  min-height: calc(100vh - 123px);
}
</style>
