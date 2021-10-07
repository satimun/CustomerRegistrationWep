<template>
  <div class="navbar navbar-light bg-default" :class="{'pl-0 pb-0': isInGrid}">
    <div class="d-table w-100">
      <div class="d-table-row">
        <div class="d-table-cell w-100 p-0">
          <form
            class="form-search"
            :class="[{'form-inline': !avSearch}, {'avSearch': avSearch}, {'p-0': !avSearch && isInGrid}]"
            @submit.prevent="Search"
          >
            <slot :avSearch="avSearch"></slot>
            <b-form-group v-show="!avSearch">
              <b-button variant="outline-primary" class="d-none d-sm-block" type="submit">
                <span class="fa fa-search"></span>
                <span class="d-none d-xl-inline ml-2">{{ $t('dic.search') }}</span>
              </b-button>
            </b-form-group>
          </form>
        </div>
        <div class="d-none d-sm-table-cell align-middle" v-if="!avSearch">
          <b-button class="navbar-toggler pt-2 pb-2" style="max-height:35px" @click="avSearch = !avSearch">
            <span class="fa fa-search-plus"></span>
          </b-button>
        </div>
      </div>
    </div>
    <div
      class="footer-search"
      :class="[{'d-sm-block d-md-block d-lg-block': avSearch}, {'d-sm-none d-md-none d-lg-none': !avSearch}]"
    >
      <b-button variant="outline-primary" @click="Search">
        <span class="fa fa-search"></span>
        <span class="d-none d-xl-inline ml-2">{{ $t('dic.search') }}</span>
      </b-button>
      <b-button
        class="navbar-toggler pt-2 pb-2 float-right mb-3"
        type="button"
        @click="avSearch = !avSearch"
      >
        <span class="fa fa-search-minus"></span>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isInGrid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted() {

  },
  data() {
    return {
      avSearch: false
    }
  },
  methods: {
    Search(e) {
      this.$emit('onClick')
    }
  }
}
</script>
