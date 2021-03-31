<template>
  <div class="container">
    <div class="grid-container">
      <div class="upper-footer grid-x">
        <div class="cell small-12 medium-6 large-3 up-element padding-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit.
        </div>
        <div class="cell small-12 medium-6 large-3 up-element padding-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit.
        </div>
        <div class="cell small-12 medium-6 large-3 up-element padding-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit.
        </div>
        <div class="cell small-12 medium-6 large-3 up-element padding-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit.
        </div>
      </div>
    </div>

    <hr class="line">

    <div class="grid-container">
      <div class="lower-footer grid-x">
        <div class="cell medium-12 large-8 lf-element">
          <a href="#"> Privacy & Cookies </a>
        </div>
        <div class="cell medium-12 large-4 lf-element lf-element--right">
          Copyright 2021. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.container {
  color: $color-white;
  background-color: $color-darker-grey;

  .line {
    margin: 0;
    padding: 0;
    max-width: 100%;
    border-top: 0.5px solid $color-grey;
  }

  .upper-footer {
    padding: 75px 0;

    .up-element {
      @media (max-width: $md-max) {
        padding-top: 20px;
      }
    }
  }

  .lower-footer {
    padding: 30px 0;

    .lf-element {
      @media (max-width: $md-max) {
        text-align: center;
      }

      &--right {
        text-align: right;

        @media (max-width: $md-max) {
          padding-top: 10px;
          text-align: center;
        }
      }
    }
  }
}

a {
  text-decoration: none;
  color: $color-white;

  &:hover {
    color: $color-violet;
  }
}

</style>
