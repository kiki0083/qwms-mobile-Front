<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h4">Typography</div>
      <q-separator class="q-my-md" />
      <p class="text-h1 text-weight-thin">Headline 1</p>
      <p class="text-h2 text-right">Headline 2</p>
      <p class="text-h3 text-center">Headline 3</p>
      <p class="text-h4 text-uppercase">Headline 4</p>
      <p class="text-h5 text-strike">Headline 5</p>
      <p class="text-h6">Headline 6</p>
      <p class="text-subtitle1">Subtitle 1</p>
      <p class="text-subtitle2">Subtitle 2</p>
      <p class="text-body1">
        Body 2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Cupiditate aliquid ad quas sunt voluptatum officia dolorum cumque,
        possimus nihil molestias sapiente necessitatibus dolor saepe inventore,
        soluta id accusantium voluptas beatae.
      </p>
      <p class="text-body2">
        Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </p>
      <p class="text-caption">Caption text</p>
      <p class="text-overline">Overline</p>
    </section>

    <section>
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
  </q-page>
</template>

<script>
import { useSession } from "stores/session";

const sessionStore = useSession();

const metaData = {
  // sets document title
  title: "Index Page",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - My Website`;
      },
    },
  },
};
</script>

<script setup></script>

<style lang="scss" scoped></style>
