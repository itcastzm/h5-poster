export const state = () => ({
    entity: {}
})

export const mutations = {
    update(state, entity) {
        state.entity = entity;
    },
    removeAll(state) {
        state.entity = {};
    }
}