<template>
  <ul
    class="menu-list"
    :style="{
      left: pos.x + 'px',
      top: pos.y + 'px',
      width: (hover ? 130 : 189) + 'px',
      fontSize: (hover ? 14 : 12) + 'px'
    }"
  >
    <template v-for="option of menuOptions">
      <li v-if="option.isSeparator" :key="option.isSeparator" class="separator">
        <hr />
      </li>
      <li
        v-else
        class="menu-item"
        :key="option.name"
        @mousedown="handleClick(option)"
      >
        <svg-icon
          v-if="!hover"
          :icon-class="(option.icon || option.name.toLowerCase()) + '-icon'"
        ></svg-icon>
        <span class="name">{{ option.name }}</span>
        <span class="short-cut">{{ option.shortCut }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
import { MENU_OPTIONS } from "@/utils/Global";
import SvgIcon from "../SvgIcon.vue";
export default {
  components: { SvgIcon },
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    pos: {
      type: Object,
      default() {
        return { x: 0, y: 0 };
      }
    }
  },
  mounted() {},
  computed: {
    menuOptions() {
      if (this.hover) {
        return [
          {
            name: MENU_OPTIONS.REPLACE
          },
          { name: MENU_OPTIONS.ADD_ON_TOP }
        ];
      }
      return [
        {
          name: MENU_OPTIONS.REPLACE,
          shortCut: ""
        },
        {
          name: MENU_OPTIONS.TRIM,
          shortCut: ""
        },
        {
          name: MENU_OPTIONS.COPY,
          shortCut: "⌘C"
        },
        {
          name: MENU_OPTIONS.PASTE,
          shortCut: "⌘V"
        },
        {
          name: MENU_OPTIONS.DELETE,
          shortCut: "DEL"
        },
        {
          isSeparator: true
        },
        {
          name: MENU_OPTIONS.SEND_BACKWARD,
          icon: "send-backward",
          shortCut: "⌘["
        },
        {
          name: MENU_OPTIONS.SEND_TO_BACK,
          icon: "send-to-back",
          shortCut: "⌘⌥["
        },
        {
          name: MENU_OPTIONS.BRING_FORWARD,
          icon: "bring-forward",
          shortCut: "⌘]"
        },
        {
          name: MENU_OPTIONS.BRING_TO_FRONT,
          icon: "bring-to-front",
          shortCut: "⌘⌥]"
        }
      ];
    }
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style scoped lang="scss">
.menu-list {
  display: block;
  position: fixed;
  background-color: #fff;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;
  font-family: "Avenir Next", sans-serif;
  overflow-y: auto;
  z-index: 9999;
  li.menu-item {
    padding-left: 8px;
    display: flex;
    height: 50px;
    align-items: center;
    // justify-content: space-around;
    &:hover {
      cursor: pointer;
      background-color: #e2e2e2;
    }
    span:not(.short-cut) {
      flex: 1;
      padding-left: 18px;
    }
    .svg-icon {
      width: 22px;
      height: 22px;
    }

    .short-cut {
      padding-right: 16px;
      color: #9b9b9b;
    }
  }
  li.separator {
    hr {
      width: 170px;
      border-width: 0;
      border-top: 1px solid #e2e2e2;
    }
  }
}
</style>
