<template>
  <div class="card-header">
    <div><span v-if="icon != null" :class="['mr-2', icon]"></span>{{title}}</div>
    <div>
      <b-button :title="$t('dic.help')" variant="primary" @click="OnClick" size="sm">
        <!--v-show="visible"-->
        <i class="fa fa-question"></i>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    docs: {
      type: String,
      default: null
    }
    /* onClick: {
      type: Function,
      default: null
    } */
  },
  computed: {
    // visible() { return typeof this.onClick === "function"; }
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
    OnClick(e) {
      // let tmp = window.location.pathname.slice(1).replace(/[/]/g, '/');
      // tmp = tmp.concat('.pdf');
      window.open(window.location.origin.concat('/docs', this.docs), '_blank')
    }
  }

}
</script>

<style scoped>
.btn {
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  vertical-align: top;
}
.card-header{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
