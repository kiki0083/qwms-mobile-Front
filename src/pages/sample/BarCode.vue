<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
  <div>
    <q-btn color="amber" label="바코드" @click="scan"></q-btn>
  </div>
  <div>
    <div id="format" color="primary" class="shadow-1 q-pa-sm">format</div>
    <div id="text" class="shadow-7 q-pa-sm">value</div>
  </div>
</template>

<script>
export default {

methods: {
  scan(){
  alert('이것은 alert 함수 입니다.');
  cordova.plugins.barcodeScanner.scan(
      function(result){
          if(!result.cancelled){

            var format = result.format;
            var text  = result.text;

            alert(`format : ${{format}}
                  value  : ${{text}}`);
            }

            document.getElementById('format').innerHTML = format;
            document.getElementById('text').innerHTML   = text;
        },

        function(error){
          alert(`Scanning Failed ${{error}}`);
        }
  );
}
},

};


</script>
