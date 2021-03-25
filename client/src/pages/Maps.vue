<template>
  <div class="content">
    <div class="container-fluid">
      <!-- Map Start -->
      <div class="row">
        <div class="col-12 mb-2">
          <gmap-map id="map" :center="center" :zoom="5" map-type-id="terrain">
            <gmap-marker
              v-for="(marker, index) in markers"
              :key="index"
              :position="getPosition(marker.coords)"
              :animation="2"
              :icon="{
                url: require(`../../public/img/icons/${marker.type}.svg`),
                size: { width: 60, height: 60, f: 'px', b: 'px' },
                scaledSize: { width: 60, height: 60, f: 'px', b: 'px' },
              }"
            >
            </gmap-marker>
          </gmap-map>
        </div>
      </div>
      <!-- Map end -->
      <div class="row">
        <!-- Table start -->
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Table of dispatch data</h4>
            </template>
            <l-table
              class="table-hover table-striped"
              :columns="this.tableColumns"
              :data="this.getDispatches"
            >
            </l-table>
          </card>
        </div>
        <!-- Table end -->
      </div>
    </div>
  </div>
</template>
<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import { API_KEY } from "./Maps/API_KEY";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import MapOptionsMixin from "../mixins/map_options";
import LTable from "src/components/Table.vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
  },
});

export default {
  mixins: [MapOptionsMixin],
  components: {
    "gmap-custom-marker": GmapCustomMarker,
    LTable,
  },

  data() {
    return {
      center: {
        lat: 39.4296413,
        lng: -84.5117321,
      },
      markers: [],
      tableColumns: [
        "Type",
        "Name",
        "Message",
        "Company",
        "Email",
        "Phone",
        "Address",
        "Cost",
      ],
    };
  },

  computed: {
    ...mapGetters(["mapData", "getDispatches"]),
    ...mapActions({
      fetchDispatchCoordinates: "fetchDispatchCoordinates",
      test: "test",
    }),
  },

  mounted() {
    this.fetchDispatchCoordinates;
    this.test;
    this.markDispatches();
  },

  methods: {
    markDispatches() {
      let index = -1;
      // Time for the setinterval to run on
      const time = this.getDispatches.length * 2 * 1000;

      const handler = setInterval(() => {
        ++index;
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

    getMarkerIcon(type) {
      const labels = {
        paid: "./Paid.svg",
        errorPaid: "./Paid.svg",
        label: "./Paid.svg",
        errorLabel: "./Paid.svg",
      };

      return labels[type];
    },
  },
};
</script>
<style>
#map {
  min-height: calc(100vh - 123px);
}
</style>
