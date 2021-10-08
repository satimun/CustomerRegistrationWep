<template>
  <div>
    <template v-if="input.type == 'select'">
      <b-form-select
        ref="input"
        autofocus
        v-model="input.value"
        :value-field="valueField"
        :text-field="textField"
        size="sm"
        :options="input.lists"
        @change="onChange"
        :required="input.required"
        @click="onClick"
      ></b-form-select>
    </template>
    <template v-else-if="input.type == 'multiselect'">
      <multiselect
        ref="input"
        v-model="input.value"
        :multiple="false"
        :cellInput="true"
        :allow-empty="!input.required"
        :options="input.lists"
        @input="onChange"
        :label="textField"
        :track-by="valueField"
        @click="onClick"
        @keydown="onKeyDown"
      ></multiselect>
    </template>
    <template v-else-if="input.type == 'date'">
      <b-form-datepicker
        ref="input"
        autofocus
        id="datefrom-filter"
        :hide-header="true"
        today-button
        :reset-button="!input.required"
        :min="input.min"
        :max="input.max"
        placeholder
        size="sm"
        v-bind="getDatelabels()"
        :date-format-options="dateformat"
        :locale="getLocale()"
        :dark="darkmode"
        label-help
        v-model="input.value"
        @input="onInput"
        @click="onClick"
        @keydown="onKeyDown"
      ></b-form-datepicker>
    </template>
    <template v-else-if="input.type == 'checkbox'">
      <b-form-checkbox
        ref="input"
        v-model="input.value"
        autofocus
        @change="onChange"
        @click="onClick"
      ></b-form-checkbox>
    </template>
    <template v-else>
      <b-input
        ref="input"
        autofocus
        size="sm"
        :type="input.type"
        :min="input.min"
        :max="input.max"
        @input="onInput"
        :required="input.required"
        v-model="input.value"
        @click="onClick"
        @keydown="onKeyDown"
      />
    </template>
  </div>
</template>

<script>
import { GetObjVal } from '@/shared/utils'
export default {
  props: {
    input: {
      type: Object,
      required: true
    }
  },
  computed: {
    valueField() {
      return GetObjVal(this.input, 'valueField', this.input.type == 'select' ? 'value' : 'id')
    },
    textField() {
      return GetObjVal(this.input, 'textField', this.input.type == 'select' ? 'text' : '_label')
    }
  },
  mounted() {
    this.value = this.input.value
    setTimeout(() => { this.focusRef(this.$refs.input) }, 250)
  },
  data() {
    return {
      value: null,
      isCommit: false
    }
  },
  methods: {
    onChange(e) {
      this.value = e
      this.isCommit = true
      this.focusParent()
    },
    onInput(e) {
      this.isCommit = true
      this.value = this.input.value
    },
    onClick(e) {
      e.stopPropagation()
    },
    onKeyDown(e) {
      if (e.which >= 37 && e.which <= 40) {
        e.stopPropagation()
      } else if (e.which == 13) {
        e.stopPropagation()
        this.isCommit = true
        this.focusParent()
      }
    },
    focusRef(ref) {
      this.$nextTick(() => {
        if (!ref) return
        this.$nextTick(() => {
          ; (ref.$el || ref).focus()
        })
      })
    },
    focusParent() {
      this.$el.parentElement.focus()
    }
  },
  updated() {
    // console.log('updated');
  },
  beforeUnmount() {
    if (this.isCommit) {
      this.$emit('onchange', this.value)
    }
    this.$emit('onblur')
  }
}
</script>

<style scoped>
.dropup,
.dropright,
.dropdown,
.dropleft {
  position: absolute;
  max-width: 120px;
}
</style>
