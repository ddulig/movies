<template>
  <div class="container">
    <div v-if="!showSearch" class="menu row">
      <img class="columns shrink" src="/images/logo.png">
      <div class="columns show-for-large">
        <div class="row dropdowns">
          <dropdown v-for="menu in menus" :key="menu[0].name" :items="menu" class="columns shrink" />
        </div>
      </div>
      <div class="columns shrink right-menu show-for-large">
        <img class="search-icon" src="/images/search.png" @click="toggleSearch">
        <a class="button" href="#" target="_blank">
          LOGIN
        </a>
      </div>
      <side-menu :items="menus" class="columns hide-for-large small-menu" />
    </div>

    <div v-if="showSearch" class="row search align-justify">
      <input v-model="searchQuery" type="text" placeholder="Type and hit enter..." :class="isSearchJustQuery ? 'query-wide' : 'query'">
      <input v-if="!isSearchJustQuery" v-model="searchTypeQuery" type="text" placeholder="Enter value" class="type-query">

      <select v-model="searchType">
        <option v-for="option in searchOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>

      <div @click="toggleSearch">
        ✕
      </div>
    </div>

    <div class="banner">
      <div v-if="!getIsNormalList" class="banner__query padding-3">
        {{ searchedCriteria }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showSearch: false,
      menus: [
        [
          {
            name: 'Home',
            parent: true,
            link: '#'
          }
        ],
        [
          {
            name: 'Pages',
            parent: true,
            link: '#'
          }
        ],
        [
          {
            name: 'Movies & TV Shows',
            parent: true,
            link: '#'
          },
          {
            name: 'Movies',
            parent: false,
            link: '#'
          },
          {
            name: 'TV Shows',
            parent: false,
            link: '#'
          }
        ],
        [
          {
            name: 'Blog',
            parent: true,
            link: '#'
          }
        ],
        [
          {
            name: 'Contact Us',
            parent: true,
            link: '#'
          }
        ]
      ],
      searchQuery: '',
      searchTypeQuery: '',
      searchType: 'query',
      searchOptions: [
        { text: 'Keyword', value: 'query' },
        { text: 'Language', value: 'language' },
        { text: 'Year', value: 'primary_release_year' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getIsNormalList: 'movies/getIsNormalList',
      getSearchConfig: 'movies/getSearchConfig'
    }),
    isSearchJustQuery () {
      return this.searchType === 'query'
    },
    searchedCriteria () {
      let msg = 'Search Results For: ' + this.getSearchConfig.query

      if (this.getSearchConfig.searchTypeQuery) {
        msg += ', ' + this.getSearchConfig.searchTypeQuery
      }

      return msg
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.handleEnter)
  },
  beforeMount () {
    window.addEventListener('keyup', this.handleEnter)
  },
  methods: {
    ...mapActions({
      searchMovie: 'movies/searchMovie'
    }),
    toggleSearch () {
      this.showSearch = !this.showSearch

      if (!this.showSearch) {
        this.searchQuery = ''
        this.searchType = 'query'
        this.searchTypeQuery = ''
      }
    },
    async handleEnter (event) {
      if (event.keyCode === 13 && this.showSearch) {
        event.preventDefault()

        if (!this.searchQuery) {
          return
        }

        await this.searchMovie({
          searchQuery: this.searchQuery,
          searchType: this.searchType,
          searchTypeQuery: this.searchTypeQuery,
          page: 1
        })

        this.toggleSearch()
      }
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  .menu {
    padding: 10px 0;
    width: 100%;
    height: 60px;
    margin: 0;
    max-width: 100%;

    img {
      height: 100%;
    }

    .dropdowns {
      height: 100%;
      position: absolute;
      margin-left: 19%;
    }

    .right-menu {
      padding-top: 10px;

      .search-icon {
        height: 15px;
        padding-right: 25px;
        cursor: pointer;
      }
    }

    .small-menu {
      text-align: right;
    }
  }

  .search {
    width: 100%;
    height: 60px;
    margin: 0;
    max-width: 100%;

    input {
      border: none;
      width: 85%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 25px;
      font-size: 1.2rem;

      &:focus {
        outline: none;
      }
    }

    .query {
      width: 60%;
    }

    .query-wide {
      width: 85%;
    }

    .type-query {
      width: 25%;
    }

    select {
      width: 10%;
      border: none;
      height: 100%;
    }

    div {
      font-size: 1.5rem;
      color: $color-light-grey;
      width: 5%;
      text-align: center;
      line-height: 3.5rem;
      cursor: pointer;
    }
  }

  .banner {
    background-image: url("static/images/banner.jpeg");
    width: 100%;
    height: 180px;

    @media (max-width: $md-max) {
      height: 190px;
    }

    &__query {
      height: 100%;
      color: $color-white;
      font-size: 2.5rem;
    }
  }
}

</style>
