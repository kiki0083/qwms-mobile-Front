<template>
  <div>
    <div style="border: 1px solid blue; width: 500px; height: 500px;">
      <img src="" id="myImage" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <q-btn label="사진찍기" color="primary" icon="camera" @click="openCamera" ></q-btn>
  </div>
</template>

<script>

/*
function openCamera() {
  alert('여기');
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 100,
    saveToPotoAlbum:true,
    destinationType: Camera.DestinationType.DATA_URL
  });

  function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }

}
*/
export default {

name: 'camera',
setup() {
    return {};
  },

  mounted() {

  },

  methods: {
    onConfirm : function(buttonIndex){
      if(buttonIndex === 2){
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
        quality: 100,
        saveToPotoAlbum:true,
        destinationType: Camera.DestinationType.DATA_URL
        });
      }
    },
    openCamera : function() {
      // navigator.notification.alert(
      //   '다얼로그 테스트 입니다.!! 김치',// message
      //   this.alertDismissed,         // callback
      //   '이것이 제목인가요',            // title
      //   '눌러보세요!!!'                // buttonName
      // );

      navigator.notification.confirm(
      '사진을 찍고 싶냥?',   // message
      this.onConfirm,      // callback to invoke with index of button pressed
      '사진찍기',           // title
      ['나가기','김치']     // buttonLabels
      );


      // navigator.camera.getPicture(this.onSuccess, this.onFail, {
      // quality: 100,
      // saveToPotoAlbum:true,
      // destinationType: Camera.DestinationType.DATA_URL
      //});

    },
      onSuccess:function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    },

    onFail:function(message) {
        alert('Failed because: ' + message);
    }

  }

};
</script>
