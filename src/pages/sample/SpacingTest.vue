<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h4">연습</div>
      <q-separator class="q-my-md" />
      <div class="column border">
        <div class="row border">
          <div class="col-xs-12 col-sm-6 col-md-4 border">First column</div>
          <div class="col-xs-12 col-sm-6 col-md-4 border">Second column</div>
          <div class="col-xs-12 col-sm-6 col-md-4 border">Third column</div>
        </div>
        <div class="row border">
          <div class="border">First column</div>
          <div class="border">Second column</div>
          <div class="border">Third column</div>
        </div>
        <div class="row border">
          <div class="border">First column</div>
          <div class="border">Second column</div>
          <div class="border">Third column</div>
        </div>
      </div>
    </section>
    <section>
      <div class="text-h4">Spacing</div>
      <q-separator class="q-my-md" />
      <div class="bg-primary q-pa-xs">
        <div class="bg-dark text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          obcaecati reiciendis voluptates, fugiat exercitationem laborum labore
          necessitatibus animi nulla, aspernatur odio ratione quas doloremque
          voluptatibus eius? Soluta enim atque ullam.
        </div>
      </div>
      <div class="bg-primary q-pa-sm q-mt-md">
        <div class="bg-dark text-white">
          Lorem1 ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          obcaecati reiciendis voluptates, fugiat exercitationem laborum labore
          necessitatibus animi nulla, aspernatur odio ratione quas doloremque
          voluptatibus eius? Soluta enim atque ullam.
        </div>
      </div>
      <div class="bg-primary q-pa-mg q-mt-md">
        <div class="bg-dark text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          obcaecati reiciendis voluptates, fugiat exercitationem laborum labore
          necessitatibus animi nulla, aspernatur odio ratione quas doloremque
          voluptatibus eius? Soluta enim atque ullam.
        </div>
      </div>
      <div class="bg-primary q-pa-lg q-mt-md">
        <div class="bg-dark text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          obcaecati reiciendis voluptates, fugiat exercitationem laborum labore
          necessitatibus animi nulla, aspernatur odio ratione quas doloremque
          voluptatibus eius? Soluta enim atque ullam.
        </div>
      </div>
      <div class="bg-primary q-pa-xl q-mt-md">
        <div class="bg-dark text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          obcaecati reiciendis voluptates, fugiat exercitationem laborum labore
          necessitatibus animi nulla, aspernatur odio ratione quas doloremque
          voluptatibus eius? Soluta enim atque ullam.
        </div>
      </div>
      <div
        class="bg-primary q-mt-md flex flex-center"
        style="width: 100%; height: 400px"
      >
        <div class="bg-dark text-white" style="width: 100px; height: 100px">
          Lorem
        </div>
      </div>
    </section>
    <section>
      <div class="text-h4">Components</div>
      <q-separator class="q-my-md" />

      <q-card
        class="my-card bg-secondary text-white q-mx-auto"
        style="width: 400px"
      >
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section> Lorem </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn outline padding="lg">Action 1</q-btn>
          <q-btn outline padding="none">Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped>
.border {
  border: 1px solid $primary;
  padding: 8px;
}
p {
  color: $red;
  background-color: $grey-5;
}

.text-error {
  color: $red;
}
.bg-error {
  background-color: $orange;
}
</style>
