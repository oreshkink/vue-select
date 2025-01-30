import { type Ref, ref } from "vue";

export default function useQuery<T>(apiFn: (value: string) => Promise<T[]>) {
  const variants: Ref<T[]> = ref([]);

  async function query(value: string) {
    const newVariants = await apiFn(value);

    variants.value = newVariants;
  }

  function clear() {
    variants.value = [];
  }

  return {
    variants,
    query,
    clear,
  };
}
