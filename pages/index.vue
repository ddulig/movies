<template>
  <div>
    <div v-if="getCurrentPageMovies.length" class="container grid-container">
      <div class="movies grid-x grid-padding-x align-center">
        <card
          v-for="movie in getCurrentPageMovies"
          :id="movie.id"
          :key="movie.id"
          class="card margin-1"
        />
      </div>

      <div class="pagination grid-container">
        <div class="grid-x grid-padding-x align-center align-middle pagination-cont">
          <div v-if="currentPage !== 1" @click="previousPage">
            Previous
          </div>
          <div v-if="firstPaginationNum" :class="isSelected(firstPaginationNum)" @click="pageNumClick(firstPaginationNum)">
            {{ firstPaginationNum }}
          </div>
          <div v-if="secondPaginationNum" :class="isSelected(secondPaginationNum)" @click="pageNumClick(secondPaginationNum)">
            {{ secondPaginationNum }}
          </div>
          <div v-if="thirdPaginationNum" :class="isSelected(thirdPaginationNum)" @click="pageNumClick(thirdPaginationNum)">
            {{ thirdPaginationNum }}
          </div>
          <div v-if="currentPage < getTotalPages" @click="nextPage">
            Next
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-movie padding-3">
      No Movie Found <br>

      <a class="button" href="#" target="_blank">
        BACK TO HOME
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPageMovies: 'movies/getCurrentPageMovies',
      getTotalPages: 'movies/getTotalPages',
      getIsNormalList: 'movies/getIsNormalList',
      getSearchConfig: 'movies/getSearchConfig'
    }),
    firstPaginationNum () {
      if (this.currentPage < 3) {
        return 1
      }

      if (this.getTotalPages === this.currentPage) {
        return this.currentPage - 2
      }

      return this.currentPage - 1
    },
    secondPaginationNum () {
      if (this.getTotalPages < 2) {
        return undefined
      }

      if (this.getTotalPages > 1 && this.currentPage < 3) {
        return 2
      }

      if (this.getTotalPages === this.currentPage) {
        return this.currentPage - 1
      }

      return this.currentPage
    },
    thirdPaginationNum () {
      if (this.getTotalPages < 3) {
        return undefined
      }

      if (this.getTotalPages > 2 && this.currentPage < 3) {
        return 3
      }

      if (this.getTotalPages === this.currentPage) {
        return this.currentPage
      }

      return this.currentPage + 1
    }
  },
  watch: {
    getTotalPages () {
      this.currentPage = 1
    }
  },
  async mounted () {
    await this.getConfigurations()
    await this.getMovies(this.currentPage)
  },
  methods: {
    ...mapActions({
      getMovies: 'movies/getPageMovies',
      getConfigurations: 'configurations/getConfigurations',
      searchMovie: 'movies/searchMovie'
    }),
    previousPage () {
      this.currentPage--
      this.changeMovieList()
    },
    nextPage () {
      this.currentPage++
      this.changeMovieList()
    },
    pageNumClick (num) {
      this.currentPage = num
      this.changeMovieList()
    },
    changeMovieList () {
      if (this.getIsNormalList) {
        this.getMovies(this.currentPage)
      } else {
        this.searchMovie({
          searchQuery: this.getSearchConfig.query,
          searchType: this.getSearchConfig.searchType,
          searchTypeQuery: this.getSearchConfig.searchTypeQuery,
          page: this.currentPage
        })
      }
    },
    isSelected (num) {
      if (num === this.currentPage) {
        return 'selected'
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>

.no-movie {
  font-size: 2.5rem;
}

.container {
  .movies {
    padding: 75px 0 0 0;

    .card {
      height: 680px;
      width: 340px;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 $color-light-grey, 0 6px 20px 0 $color-light-grey;
      top: 0;
      position:relative;
      transition: top 0.2s ease-out;

      @media (max-width: $md-max) {
        width: 250px;
        height: 750px;
      }

      @media (max-width: $sm-max) {
        width: 90%;
      }

      &:hover {
        top: -12px;
      }
    }
  }

  .pagination {
    font-size: 0.9rem;
    height: 60px;
    padding: 75px 0 125px 0;

    .pagination-cont {
      div {
        height: 50px;
        width: 50px;
        cursor: pointer;
        margin: 0 10px;
        line-height: 3.4em;
        text-align: center;
        border-radius: 50%;
        transition: background 0.5s, color 0.5s;

        &:hover {
          background: $color-light-grey;
          color: $color-violet;
        }
      }

      .selected {
        background-color: $color-violet;
        border-radius: 50%;
        color: $color-white;
      }
    }
  }
}

</style>
