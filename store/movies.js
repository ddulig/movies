const REST_API_KEY = process.env.REST_API_KEY
const SEARCH_URL = '/search'
const MOVIE_URL = '/movie'
const NOW_PLAYING_URL = '/now_playing'
const API_KEY = 'api_key=' + REST_API_KEY

export const state = () => ({
  totalPages: 0,
  currentPageMovies: [],
  movies: [],
  isNormalList: true,
  searchConfig: {
    query: '',
    searchType: '',
    searchTypeQuery: ''
  }
})

export const getters = {
  getCurrentPageMovies: (state) => {
    return state.currentPageMovies
  },
  getTotalPages: (state) => {
    return state.totalPages
  },
  getMovieDetails: state => (id) => {
    const movies = state.movies

    return movies.find(m => m.id === id)
  },
  getSearchConfig: (state) => {
    return state.searchConfig
  },
  getIsNormalList: (state) => {
    return state.isNormalList
  }
}

export const mutations = {
  setPageMovies (state, data) {
    state.currentPageMovies = data.results
    state.totalPages = data.total_pages
  },
  addMovie (state, data) {
    state.movies.push(data)
  },
  setSearchConfig (state, data) {
    state.searchConfig = {
      query: data.searchQuery,
      searchType: data.searchType,
      searchTypeQuery: data.searchTypeQuery
    }
  },
  setIsNormalList (state, data) {
    state.isNormalList = data
  }
}

export const actions = {
  async getPageMovies ({ commit }, payload) {
    const url = MOVIE_URL + NOW_PLAYING_URL + `?page=${payload}&` + API_KEY

    let response

    try {
      response = await this.$axios.get(url)
    } catch (e) {
      return undefined
    }

    commit('setPageMovies', response.data)
    commit('setIsNormalList', true)
  },
  async getMovieDetails ({ commit }, payload) {
    const url = MOVIE_URL + `/${payload}?` + API_KEY

    let response

    try {
      response = await this.$axios.get(url)
    } catch (e) {
      return undefined
    }

    commit('addMovie', response.data)
  },
  async searchMovie ({ commit }, payload) {
    const { searchQuery, searchType, searchTypeQuery, page } = payload

    let url = SEARCH_URL + MOVIE_URL + '?' + API_KEY + '&page=' + page

    if (searchType === 'query') {
      url += '&' + searchType + '=' + searchQuery
    } else {
      url += '&query=' + searchQuery

      if (searchTypeQuery) {
        url += '&' + searchType + '=' + searchTypeQuery
      }
    }

    let response

    try {
      response = await this.$axios.get(url)
    } catch (e) {
      return undefined
    }

    commit('setPageMovies', response.data)
    commit('setSearchConfig', payload)
    commit('setIsNormalList', false)
  }
}
