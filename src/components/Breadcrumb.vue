<template>
    <div class="-intro-x breadcrumb mr-auto">
        <a href="">Home</a>
        <ChevronRightIcon class="breadcrumb__icon" />
        <a href="" :class="[isBreadcrumbAactive(index)]"
        :key="index" v-for="(routeObject, index) in routeRecords"
        >
        <span class="active" v-if="isLast(index)">{{ getName(routeObject) }}</span>
      <router-link :to="routeObject" v-else>{{ getName(routeObject) }} <ChevronRightIcon class="breadcrumb__icon" /> </router-link>
        </a>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    routeRecords: function () {
      return this.list.filter((route) => route.name || route.meta.label)
    }
  },
  methods: {
    getName(item) {
      // console.log(item)
      return item.meta && item.meta.label ? item.meta.label : item.name || null
    },
    isLast(index) {
      return index === this.list.length - 1
    },
    isBreadcrumbAactive(index) {
      return this.isLast(index) ? 'breadcrumb--active' : ''
    }
  }
}
</script>
