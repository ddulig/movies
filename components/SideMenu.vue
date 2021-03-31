<template>
  <div class="side-menu">
    <img v-if="!showMenu" src="/images/burger-menu.png" class="burger" @click="openNav">
    <div v-else class="close" @click="closeNav">
      &times;
    </div>

    <div id="mySidenav" class="container">
      <div class="title">
        MENU
      </div>
      <div v-for="menu in getParentMenus" :key="menu.name" href="#">
        {{ menu.name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    getParentMenus () {
      return this.items.flat().filter(m => m.parent)
    }
  },
  methods: {
    openNav () {
      this.showMenu = true
      document.getElementById('mySidenav').style.width = '300px'
      document.getElementsByTagName('body')[0].style.marginRight = '300px'
    },
    closeNav () {
      this.showMenu = false
      document.getElementById('mySidenav').style.width = '0'
      document.getElementsByTagName('body')[0].style.marginRight = '0'
    }
  }
}

</script>

<style lang="scss" scoped>

.side-menu {

  .burger {
    height: 25px;
    cursor: pointer;
  }

  .close {
    font-size: 3rem;
    line-height: 2rem;
    cursor: pointer;
  }

  .container {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: $color-ligther-black;
    overflow-x: hidden;
    transition: 0.5s;
    right: 0;

    div {
      width: 100%;
      color: $color-white;
      padding: 15px;
      border-bottom: $color-dark-grey solid 0.1px;
      cursor: pointer;
      text-align: left;
    }

    .title {
      text-align: center;
      cursor: default;
    }
  }
}

</style>
