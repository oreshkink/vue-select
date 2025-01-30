import { ref } from "vue";

export default function useDropdownState() {
  const isOpened = ref(false);

  function close() {
    isOpened.value = false;
  }

  function open() {
    isOpened.value = true;
  }

  return {
    isOpened,
    close,
    open,
  };
}
