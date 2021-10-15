<template>
  <div class="intro-x">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-7">
      <h2 class="text-lg font-medium mr-auto hidden">Qr code scan {{mode}}</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="btn btn-primary shadow-md mr-2"
          @click="mode = 'stream'"
        >Scan</button>
        <div class="dropdown ml-auto sm:ml-0">
          <button
            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
            aria-expanded="false"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
          </button>
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a
                href="javascript:;"
                @click="mode = 'capture'"
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileIcon class="w-4 h-4 mr-2" /> Choose file
              </a>
              <a
                href="javascript:;"
                @click="mode = 'dropzone'"
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <DownloadIcon class="w-4 h-4 mr-2" /> Drop image
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="single-file-upload"
      class="pt-5 hidden"
    >
      <div class="preview">
        Result: {{data}}
      </div>
    </div>

    <div class="w-100 sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0 p-5">
      <qr-capture
        @decode="onDecode"
        class="w-full mb"
        v-if="mode == 'capture'"
      ></qr-capture>
      <qr-stream
        @decode="onDecode"
        class="w-full mb"
        v-if="mode == 'stream'"
      >
        <div
          style="color: red;"
          class="frame font-medium"
        ></div>
      </qr-stream>
      <qr-dropzone
        class="dropzone mb text-sm w-full "
        @decode="onDecode"
        v-if="mode == 'dropzone'"
      >
        Drop image here.
      </qr-dropzone>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { QrStream, QrCapture, QrDropzone } from 'vue3-qr-reader'
export default {
  name: 'QrCodeReader',
  components: {
    QrStream,
    QrCapture,
    QrDropzone
  },
  props: {
    qrdata: String
  },
  setup () {
    const state = reactive({
      data: null
    })
    function onDecode (data) {
      state.data = data
    }
    return {
      ...toRefs(state),
      onDecode
    }
  },
  data () {
    return {
      modes: ['stream', 'capture', 'dropzone'],
      mode: ''
    }
  },
  methods: {
    onQrScan () {
      this.mode = ''
      console.log(this.mode, ' mode')
      this.$emit('onQrScan', this.data)
    },
    isColor (lang) {
      return lang == this.$i18n.locale ? 'text-theme-17 block font-extrabold' : ''
    }
  },
  watch: {
    data (newVal, oldVal) {
      if (newVal) {
        this.$emit('onQrScan', this.data)
      }
    }
  }
}
</script>
