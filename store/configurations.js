const REST_API_KEY = process.env.REST_API_KEY
const CONFIGURATION_URL = '/configuration'
const API_KEY = 'api_key=' + REST_API_KEY

export const state = () => ({
  configurations: {}
})

export const getters = {
  getConfiguration: (state) => {
    return state.configurations
  },
  getBaseUrl: (state) => {
    if (!state.configurations.images) {
      return
    }

    return state.configurations.images.base_url
  },
  getPosterSizes: (state) => {
    if (!state.configurations.images) {
      return
    }

    return state.configurations.images.poster_sizes
  }
}

export const mutations = {
  setConfigurations (state, data) {
    state.configurations = data
  }
}

export const actions = {
  async getConfigurations ({ commit, getters }) {
    if (Object.keys(getters.getConfiguration).length) {
      return
    }

    const url = CONFIGURATION_URL + '?' + API_KEY

    let response

    try {
      response = await this.$axios.get(url)
    } catch (e) {
      return undefined
    }

    commit('setConfigurations', response.data)
  }
}
