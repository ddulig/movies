<template>
  <div class="dropdown" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <a href="#" class="anchor">
      {{ getParent.name }}
      <img v-if="getChildren.length" src="/images/down-arrow.png" class="down-arrow">
    </a>
    <div v-if="showMenu" class="menu">
      <div v-for="child in getChildren" :key="child.name" class="menu-item" @click="itemClicked(child)">
        {{ child.name }}
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
    getParent () {
      return this.items.find(i => i.parent)
    },
    getChildren () {
      return this.items.filter(i => !i.parent)
    }
  },
  methods: {
    toggleShow () {
      this.showMenu = !this.showMenu
    },
    mouseLeave () {
      this.showMenu = false
    },
    mouseEnter () {
      if (!this.getChildren.length) {
        return
      }

      this.showMenu = true
    }
  }
}

</script>

<style lang="scss" scoped>

.dropdown {
  height: 100%;

  .anchor {
    text-decoration: none;
    line-height: 2.5rem;
    color: $color-darker-grey;
    font-weight: 300;
    font-size: 0.9rem;

    .down-arrow {
      height: 6px;
      margin-bottom: 2.2px;
    }
  }

  .menu {
    background-color: $color-white;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    color: $color-grey;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    list-style: none;
    padding: .5rem 0;
    position: absolute;
    text-align: left;

    .menu-item {
      color: $color-dark-grey;
      padding: .25rem 1.5rem;

      &:hover {
        cursor: pointer;
        color: $color-violet;
      }
    }
  }
}

</style>
