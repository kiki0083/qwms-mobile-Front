<template>
  <q-page padding>
    <p class="text-h6">Camera</p>
    <div class="row">
      <div class="col-12">
        <video autoplay width="250rem" ref="videoplay"></video>
      </div>
      <div class="col-12 text-center">
        <q-btn
          label="Acessar Camera"
          color="primary"
          icon="camera"
          @click="useCamera"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      enableCamera: false,
    };
  },

  mounted() {
    // if (navigator.mediaDevices.getUserMedia) {
    //   this.enableCamera = false;
    // }
    useCamera();
  },

  methods: {
    useCamera() {
      navigator.mediaDevices.getUserMedia({ video: true }).then(MediaStream => {
        console.log(MediaStream);
        this.$refs.videoplay.srcObject = MediaStream;
      });
    },
  },
};
</script>
