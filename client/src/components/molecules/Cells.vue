<template>
  <div class="cells">
    <Cell v-for="(position, i) in positions" 
          :key="i" :index="i" 
          :position="position" 
          :replay="replay"
    />
  </div>
</template>

<script>
import Cell from '../atoms/Cell';
import { mapState } from 'vuex';
export default {
  name: 'Cells',
  components: {
    Cell
  },
  computed: {
    ...mapState([
      'number'
    ])
  },
  props: {
    positions: {
      type: Array,
      required: true,
    },
    replay: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
}
</script>
