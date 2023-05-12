<template>
  <div>
    GPS position: <strong>{{ position }}</strong>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Geolocation } from '@capacitor/geolocation'

    const position = ref('determining...')

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('Current', newPosition)
        position.value = newPosition
      })
    }

    let geoId

    onMounted(() => {
      getCurrentPosition()

      // we start listening
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('New GPS position')
        position.value = newPosition
      })
    })

    onBeforeUnmount(() => {
      // we do cleanup
      Geolocation.clearWatch(geoId)
    })
</script>
