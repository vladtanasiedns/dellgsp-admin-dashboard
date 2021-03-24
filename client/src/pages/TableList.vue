<template>
  <div class="content">
    <div class="container-fluid">
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

        <!-- <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :data="table2.data">
              </l-table>
            </div>
          </card>
        </div> -->

        <!-- <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Small table</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <l-table
              class="table-hover table-striped table-sm"
              :columns="table1.columns"
              :data="table1.data"
            >
            </l-table>
          </card>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
import { mapGetters } from "vuex";
const tableColumns = [
  "Type",
  "Name",
  "Message",
  "Company",
  "Email",
  "Phone",
  "Address",
  "Cost",
];

export default {
  components: {
    LTable,
    Card,
  },
  computed: {
    ...mapGetters({
      getDispatches: "getDispatches",
    }),
  },
  created() {
    console.log(this.getDispatches);
  },
  data() {
    return {
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
};
</script>
<style>
</style>
