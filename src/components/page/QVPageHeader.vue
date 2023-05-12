<template>
  <section>
    <div class="row">
      <div class="col-11 q-gutter-sm">
        <div v-if="$route.meta.breadcrumbs">
          <q-breadcrumbs class="text-brown" gutter="xs">
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el
              v-for="(path, idx) in breadcrumbs"
              :key="idx"
              :label="path"
            />
          </q-breadcrumbs>
        </div>
      </div>
      <div class="col-1">
        <!-- <q-slide-transition>
          <div v-show="!props.showSearch">
            <q-btn
              round
              color="primary"
              icon="shopping_cart"
              size="xs"
              @click="toggleSearch()"
            />
          </div>
        </q-slide-transition> -->
      </div>
    </div>

    <q-separator class="q-my-md" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = ref("");
if (route.meta.breadcrumbs)
  breadcrumbs.value = route.meta.breadcrumbs.split(">");

//const emit = defineEmits(["toggleSearch"]);

// const props = defineProps({
//   showSearch: {
//     type: Boolean,
//     required: false,
//     default: true,
//   },
// });

// const toggleSearch = () => {
//   if (toggleSearch) emit("toggleSearch");
// };

// 메뉴 리스트의 변경을 감지하여 router에 메뉴 추가
// watch(
//   props,
//   (newValue, oldValue) => {
//     makeRoute(newValue.menuList);
//     makeRoute(newValue.favoriteList);
//   }
// );
</script>
