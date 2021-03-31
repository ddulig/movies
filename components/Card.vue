<template>
  <div v-if="movie" class="card">
    <div v-if="watched" class="watched">
      WATCHED
    </div>
    <div class="play">
      <a class="arrow-right" href="#" />
    </div>
    <div class="image">
      <img :src="getPosterImage">
    </div>
    <div class="details padding-2 ">
      <span class="title">
        {{ movie.title }}
      </span>
      <div class="ratings margin-top-1 margin-bottom-1 row align-justify">
        <span class="">
          <span class="star">★</span>
          {{ getVotes }}
        </span>
        <span class="text-right">{{ getGenres }}</span>
      </div>
      <div class="overview margin-bottom-2">
        {{ movie.overview }}
      </div>
      <div>
        <a class="button" :disabled="!!getImdbLink" :href="getImdbLink" target="_blank" @click="detailsClicked">
          DETAILS
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addToLS, getFromLS } from '~/util/localstorage'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      movie: undefined,
      watched: false
    }
  },
  computed: {
    ...mapGetters({
      getMovieDetails: 'movies/getMovieDetails',
      getBaseUrl: 'configurations/getBaseUrl',
      getPosterSizes: 'configurations/getPosterSizes'
    }),
    alreadyWatched () {
      if (!getFromLS('watched')) {
        return false
      }

      const moviesWatched = getFromLS('watched')
      return moviesWatched.includes(this.id)
    },
    getPosterImage () {
      let posterSize = this.getPosterSizes.find(ps => ps === 'w500')

      if (!posterSize) {
        posterSize = 'original'
      }

      return this.getBaseUrl + posterSize + this.movie.poster_path
    },
    getVotes () {
      if (!this.movie) {
        return ''
      }

      return this.movie.vote_average + ' / 10'
    },
    getGenres () {
      if (!this.movie) {
        return ''
      }

      let genres = ''
      let count = 0
      this.movie.genres.some((g) => {
        if (count === 2) {
          genres += '..., '
          return true
        }

        genres += g.name + ', '
        count++
        return false
      })

      return genres.substr(0, genres.length - 2)
    },
    getImdbLink () {
      if (!this.movie || !this.movie.imdb_id) {
        return
      }

      const imdbLink = 'https://www.imdb.com/title/'

      return imdbLink + this.movie.imdb_id
    }
  },
  async mounted () {
    if (!this.getMovieDetails(this.id)) {
      await this.getApiMovieDetails(this.id)
    }

    this.movie = this.getMovieDetails(this.id)
    this.watched = this.alreadyWatched
  },
  methods: {
    ...mapActions({
      getApiMovieDetails: 'movies/getMovieDetails'
    }),
    detailsClicked () {
      let moviesWatched = []

      if (getFromLS('watched')) {
        moviesWatched = getFromLS('watched')
      }

      if (!moviesWatched.includes(this.id)) {
        moviesWatched.push(this.id)
        addToLS('watched', moviesWatched)
        this.watched = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  position: relative;

  .image {
    position: relative;
    width: 100%;
    height: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    @media (min-width: $md-min) and (max-width: $md-max) {
      height: 40%;
    }
  }

  .watched {
    position: absolute;
    top: 2%;
    left: 5%;
    z-index: 10;
    background-color: $color-red;
    color: $color-white;
    border-radius: 10px;
    padding: 5px 10px;
    font-weight: 800;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 73%;
    height: 60px;
    width: 60px;
    background-color: $color-violet;
    z-index: 10;
    border-radius: 50%;
    margin-top: -30px;
    box-shadow: 0 0 30px 0 $color-violet;

    @media (min-width: $md-min) and (max-width: $md-max) {
      top: 40%;
    }

    .arrow-right {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -8px;
      margin-left: -4px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 13px solid $color-white;
    }
  }

  .details {
    height: 50%;

    @media (min-width: $md-min) and (max-width: $md-max) {
      height: 60%;
    }

    .title {
      font-size: 1.5rem;
    }

    .ratings {
      color: $color-grey;
      font-size: 0.9rem;

      .star {
        color: $color-gold;
      }
    }

    .overview {
      color: $color-dark-grey;
      max-height: 45%;
      overflow: hidden;
      line-height: 24px;
    }
  }
}

</style>
