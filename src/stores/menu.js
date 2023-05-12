import { defineStore } from "pinia";

/*
  Pinia Store 설정
  1. counterStore : Pinia Store 전역 ID명
  2. state : 상태값
  3. getters : component computed
  4. actions : component method
*/
export const useMenuStore = defineStore("menuStore", {
  state: () => ({
    menuList: {},
  }),
  getters: {
    getMenuList: (state) => {
      return state.menuList;
    },
  },
  actions: {
    setMenuList(menuList) {
      this.menuList = menuList;
    },
  },
});

export const useMdiStore = defineStore("mdiStore", {
  state: () => ({
    mdiList: [],
    cacheComponentList: [], // router view cache할 컴포넌트
  }),
  getters: {
    getMdiList: (state) => {
      return state.mdiList;
    },
    getCacheComponentList: (state) => {
      return state.cacheComponentList;
    },
  },
  actions: {
    // 전체 MDI 새로 세팅
    setMdiList(mdiList) {
      this.mdiList = mdiList;

      this.cacheComponentList = [];
      // /src/pages/FormTest.vue => FormTest
      for (let idx = 0; idx < mdiList.length; idx++) {
        let componentName = menu.component.split("/");
        componentName = componentName[componentName.length - 1].split(".");
        this.cacheComponentList[idx] = componentName[0];
      }
    },
    // MDI 추가
    addMdiList(menu) {
      this.mdiList.push(menu);

      let componentName = menu.component.split("/");
      componentName = componentName[componentName.length - 1].split(".");
      this.cacheComponentList.push(componentName[0]);
    }, // MDI 삭제
    removeMdiList(menu) {
      for (let idx = 0; idx < this.mdiList.length; idx++) {
        if (Object.is(this.mdiList[idx], menu)) {
          this.mdiList.splice(idx, 1);
          this.cacheComponentList.splice(idx, 1);
          break;
        }
      }
    },
  },
});

export const useFavoriteStore = defineStore("favoriteStore", {
  state: () => ({
    favoriteList: {},
  }),
  getters: {},
  actions: {},
});
