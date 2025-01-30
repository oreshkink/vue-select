import { type Ref, ref } from "vue";

export default function useVariantSelection<T>({
  variants,
  onSelect,
}: {
  variants: Ref<T[]>;
  onSelect: (v: T) => void;
}) {
  const selectedVariant: Ref<T | undefined> = ref();

  function selectVariant(variant: T) {
    selectedVariant.value = variant;

    onSelect(variant);
  }

  function unselectVariant() {
    selectedVariant.value = undefined;
  }

  function selectByPosition(position: number) {
    const possibleVariantToSelect = variants.value[position];

    if (!possibleVariantToSelect) {
      throw Error("Не найден элемент для выбора");
    }

    selectVariant(possibleVariantToSelect);
  }

  return {
    selectedVariant,
    selectVariant,
    unselectVariant,
    selectByPosition,
  };
}
