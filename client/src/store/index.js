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
        },

        mapData(state) {
            return state.dispatches.map((dispatch) => {
                return {
                    type: dispatch.type,
                    address: dispatch.address,
                    coords: dispatch.coords,
                    cost: dispatch.cost
                }
            })
        }
    },

    // Actions decide when mutations run and run them
    actions: {
        fetchDispatches({ commit }) {
            commit('setDispatches', dispatches);
        },

        fetchDispatchCoordinates({ commit, state }) {
            //https://nominatim.openstreetmap.org/search?postalcode=86351&format=json
            state.dispatches.forEach((d, i) => {
                const address = d.address.split(",");
                const zip = address[address.length - 1];
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&sensor=true&key=${process.env.VUE_APP_GOOGLE_MAPS_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        const location = data.results[0].geometry.location;
                        const payload = { lat: location.lat, lng: location.lng, index: i }
                        commit('addCoordsToDispatch', payload)
                    });
            });
        },

        test({ state }) {
            console.log(state.dispatches);
        }
    },

    // Mutations always update the state
    mutations: {
        setDispatches(state, dispatches) {
            state.dispatches = dispatches;
        },

        addCoordsToDispatch(state, payload) {
            const { lat, lng, index } = payload;

            state.dispatches.forEach((d, i) => {
                // find object by index
                if (index == i) {
                    // update object to contain coordinates
                    state.dispatches[i].coords = { lat, lng };
                }
            });
        }
    }

})
