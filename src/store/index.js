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

        dispatchesCount(state) {
            return state.dispatches.length;
        },

        paidDispatchesCount(state) {
            let paidDispatches = state.dispatches.filter(dispatch => dispatch.type === "paid");
            return paidDispatches.length;
        },

        labelDispatchesCount(state) {
            let labelDispatches = state.dispatches.filter(dispatch => dispatch.type === "label");
            return labelDispatches.length;
        },

        errorPaidDispatchesCount(state) {
            let errorPaid = state.dispatches.filter(dispatch => dispatch.type === "errorPaid");
            return errorPaid.length;
        },

        errorLabelDispatchesCount(state) {
            let errorLabel = state.dispatches.filter(dispatch => dispatch.type === "errorLabel");
            return errorLabel.length;
        },

        paidTotalCost(state) {
            return state.dispatches.reduce((total, dispatch) => {
                dispatch.type === "paid" ? total += dispatch.cost : total += 0
                return total;
            }, 0);
        },

        labelTotalCost(state) {
            return state.dispatches.reduce((total, dispatch) => {
                dispatch.type === "label" ? total += dispatch.cost : total += 0
                return total;
            }, 0);
        },

        labelErrorTotalCost(state) {
            return state.dispatches.reduce((total, dispatch) => {
                dispatch.type === "errorLabel" ? total += dispatch.cost : total += 0
                return total;
            }, 0);
        },

        paidErrorTotalCost(state) {
            return state.dispatches.reduce((total, dispatch) => {
                dispatch.type === "errorPaid" ? total += dispatch.cost : total += 0
                return total;
            }, 0);
        },

        // Returns series array contains an array for "errorPaid", "paid" and "errorLabel" types
        lineChartData(state) {
            const labels = ["paid", "label", "errorLabel", "errorPaid"]
            const series = [];

            for (let label of labels) {
                const costs = state.dispatches.reduce((t, d) => {
                    if (d.type === label) {
                        t.push(d.cost);
                    }
                    return t;
                }, []);

                series.push(costs);
            }

            return {
                labels: [],
                series
            };
        },

        pieChartData(state) {
            let labels = [];
            let series = [];

            state.dispatches.forEach(dispatch => {
                if (!labels.includes(dispatch.type)) {
                    labels.push(dispatch.type);
                }
            });

            for (let label of labels) {
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

        test(context) {
            console.log(context.state.dispatches)
        }
    },

    // Mutations always update the state
    mutations: {
        setDispatches(state, dispatches) {
            state.dispatches = dispatches;
        }
    }

})
