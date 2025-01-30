import { type Ref, ref } from "vue";

export default function useVariantSelection<T>(variants: Ref<T[]>) {
  const selectedVariant: Ref<T | undefined> = ref();

  function selectVariant(variant: T) {
    selectedVariant.value = variant;
  }

  function unselectVariant() {
    selectedVariant.value = undefined;
  }

  function selectByPosition(position: number) {
    const possibleVariantToSelect = variants.value[position];

    if (!possibleVariantToSelect) {
      throw Error("Не найден элемент для выбора");
    }

    selectedVariant.value = possibleVariantToSelect;
  }

  return {
    selectedVariant,
    selectVariant,
    unselectVariant,
    selectByPosition,
  };
}
