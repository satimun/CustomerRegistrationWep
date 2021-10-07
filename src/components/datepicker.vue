<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-form-datepicker
        :id="id"
        :hide-header="true"
        button-variant="light"
        button-only
        today-button
        reset-button
        placeholder
        v-bind="getDatelabels()"
        :date-format-options="dateformat"
        :locale="getLocale()"
        :dark="darkmode"
        label-help
        v-model="dateValue"
        @input="onChange"
      ></b-form-datepicker>
    </b-input-group-prepend>
    <b-form-input
      class="date-filter"
      v-model="dateInput"
      type="text"
      placeholder="dd/mm/yyyy"
      autocomplete="off"
      :state="isInvalid ? !isInvalid : null"
      @input="onInput"
    ></b-form-input>
  </b-input-group>
</template>

<script>
import { GetDateView, GetDate, IsNull } from '@/shared/utils'

export default {
  props: {
    value: {
      type: String | Object,
      required: true
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      dateInput: '',
      dateValue: '',
      isInvalid: false
    }
  },
  methods: {
    onInput() {
      let date = this.dateInput
      this.isInvalid = false
      this.dateValue = undefined
      if (!IsNull(this.dateInput)) {
        let tmp = this.dateInput.split('/')
        if (tmp.length == 3) {
          try {
            tmp = new Date(tmp[2] + '-' + tmp[1] + '-' + tmp[0])
            if (tmp == 'Invalid Date') {
              this.isInvalid = true
              return
            }
            date = GetDate(tmp)
          } catch (ex) {
            this.isInvalid = true
            return
          }
        } else {
          this.isInvalid = true
          return
        }
        this.dateValue = date
      }
      this.onChange()
    },
    onChange() {
      this.$emit('input', this.dateValue)
    }
  },
  watch: {
    value(val) {
      this.dateValue = val
      if (!IsNull(val)) {
        val = GetDateView(val)
      }
      this.dateInput = val
    }
  }
}
</script>
