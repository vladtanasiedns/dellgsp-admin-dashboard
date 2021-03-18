import Vuex from 'vuex';
import Vue from 'vue';
import { dispatches } from "../data/data";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        dispatches: []
    },

    // Always return computed properties with data from the state
    getters: {
        getDispatches(state) {
            return state.dispatches;
        },

        getDispatchesCount(state) {
            return state.dispatches.length;
        },

        getTotalCostPaidDispatched(state) {
            return state.dispatches.reduce((total, dispatch) => {
                if (dispatch.type != "errorPaid") {
                    total + dispatch.cost;
                }
            }, 0);
        },

        getPaidDispatchesCount(state) {
            let paidDispatches = state.dispatches.map(dispatch => dispatch.type === "paid");
            return paidDispatches.length;
        },

        getLabelDispatchesCount(state) {
            let paidDispatches = state.dispatches.map(dispatch => dispatch.type === "label");
            return paidDispatches.length;
        },

        getErrorPaidDispatchesCount(state) {
            let paidDispatches = state.dispatches.map(dispatch => dispatch.type === "errorPaid");
            return paidDispatches.length;
        },

        getErrorLabelDispatchesCount(state) {
            let paidDispatches = state.dispatches.map(dispatch => dispatch.type === "errorLabel");
            return paidDispatches.length;
        },

        // Returns series array contains an array for "errorPaid", "paid" and "errorLabel" types
        getLineChartData(state) {
            let errorSeries = state.dispatches.filter(dispatch => dispatch.cost > 0 && dispatch.type === "errorPaid");
            let paidSeries = state.dispatches.filter(dispatch => dispatch.cost > 0 && dispatch.type === "paid");
            let errorlabelSeries = state.dispatches.filter(dispatch => dispatch.cost > 0 && dispatch.type === "errorLabel");
            let labelSeries = state.dispatches.filter(dispatch => dispatch.cost > 0 && dispatch.type === "label");

            return [
                [...errorSeries],
                [...paidSeries],
                [...labelSeries],
                [...errorlabelSeries]
            ];
        },

        getPieChartData(state, getters) {
            let labels = [];
            let series = [];

            state.dispatches.forEach(dispatch => {
                if (!labels.includes(dispatch.type)) {
                    labels.push(dispatch.type);
                }
            });

            for (label of labels) {
                let total = 0

                state.dispatches.forEach((dispatch) => {
                    if (dispatch.type === label) {
                        total += dispatch.cost;
                    }
                })

                series.push(total)
            }

            return {
                labels,
                series
            }
        }
    },

    // Actions decide when mutations run and run them
    actions: {
        fetchDispatches({ commit }) {
            commit('setDispatches', dispatches);
        },
    },

    // Mutations always update the state
    mutations: {
        setDispatches(state, dispatches) {
            state.dispatches = dispatches;
        }
    }

})
