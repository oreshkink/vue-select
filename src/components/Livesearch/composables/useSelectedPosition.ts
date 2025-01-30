import { type ComputedRef, ref } from "vue";

export default function useSelectedPosition(maxPosition: ComputedRef<number>) {
  const selectedPosition = ref(0);

  function incrementPosition() {
    if (selectedPosition.value + 1 >= maxPosition.value) {
      selectedPosition.value = maxPosition.value - 1;

      return;
    }

    selectedPosition.value++;
  }

  function decrementPosition() {
    if (selectedPosition.value <= 0) {
      selectedPosition.value = 0;

      return;
    }

    selectedPosition.value--;
  }

  return {
    selectedPosition,
    incrementPosition,
    decrementPosition,
  };
}
