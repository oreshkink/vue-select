<script lang="ts" setup generic="T">
const props = defineProps<{
  variants: T[];
  selectedPosition: number;
}>();

const emit = defineEmits<{
  wasSelected: [variant: T];
}>();
</script>

<template>
  <div class="variants">
    <div
      v-for="(variant, i) in variants"
      :key="i"
      class="variants__item"
      :class="{
        'variants__item--selected': i === props.selectedPosition,
      }"
      @click.stop="
        () => {
          emit('wasSelected', variant);
        }
      "
    >
      <slot :variant="variant" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.variants {
  .variants__item {
    border: 1px solid black;
    background-color: white;
  }

  .variants__item--selected,
  .variants__item:hover {
    background-color: #f2f9ff;
    cursor: pointer;
  }
}
</style>
