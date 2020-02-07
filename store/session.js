export const state = () => ({
    token: null
})

export const mutations = {
    update(state, token) {
        state.token = token;
    },
    clear(state) {
        state.token = null;
    }
}