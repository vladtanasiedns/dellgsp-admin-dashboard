<template>
  <gmap-map
    id="map"
    :center="center"
    :zoom="5"
    :options="options"
    map-type-id="terrain"
  >
    <gmap-marker
      v-for="(marker, index) in markers"
      :key="index"
      :position="getPosition(marker.coords)"
    ></gmap-marker>
    <gmap-marker :position="center"></gmap-marker>
  </gmap-map>
</template>
<script>
import { API_KEY } from "./Maps/API_KEY";
import { mapGetters } from "vuex";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCustomMarker from "vue2-gmap-custom-marker";
Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
  },
});
export default {
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
      options: {
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      },
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
