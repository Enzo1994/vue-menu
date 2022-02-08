import Vue from "vue";

import MenuList from "./MenuList.vue";

const MenuListCtor = Vue.extend(MenuList);

let closed = true;

Vue.prototype.callMenu = function({ hover, pos }) {
  return new Promise((resolve, reject) => {
    if (!closed) {
      return reject();
    }
    closed = false;
    const instance = new MenuListCtor();
    instance.hover = hover;
    instance.pos = pos;
    instance.handleClick = function({ name }) {
      console.log(name);
      resolve(name);
    };
    const { $el } = instance.$mount();
    document.body.appendChild($el);
    $el.addEventListener("click", e => e.stopPropagation());
    if (window.innerHeight - pos.y < pos.y) {
      pos.y = pos.y - $el.offsetHeight - 20;
      if (pos.y < 0) {
        $el.style.height = $el.offsetHeight + pos.y + "px";
        pos.y = 0;
      }
    } else {
      if (pos.y + $el.offsetHeight > window.innerHeight) {
        $el.style.height = window.innerHeight - pos.y - 20 + "px";
      }
    }

    function eventHandler() {
      instance.$destroy();
      $el.parentNode?.removeChild($el);
      closed = true;
      reject();
    }
    document.body.addEventListener("mousedown", eventHandler, { once: true });
    window.addEventListener("resize", eventHandler, { once: true });
  });
};

const components = require.context("./", false, /\.vue/);

components.keys().forEach(fileName => {
  const componentModule = components(fileName);
  const componentName =
    (componentModule.default && componentModule.default.name) ||
    fileName.replace(/\.\/(.*)\.vue/, "$1");

  Vue.component(componentName, componentModule.default || componentModule);
});
