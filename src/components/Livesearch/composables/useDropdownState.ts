import { ref, watchEffect } from "vue";

export default function useDropdownState() {
  const isOpened = ref(false);

  function close() {
    isOpened.value = false;
  }

  function open() {
    isOpened.value = true;
  }

  watchEffect(() => {
    console.log(isOpened.value);
  });

  return {
    isOpened,
    close,
    open,
  };
}
