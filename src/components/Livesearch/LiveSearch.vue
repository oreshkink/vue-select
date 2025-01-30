<script
  lang="ts"
  setup
  generic="T extends { name: string | null; alias: string | null }"
>
import { computed, nextTick, useTemplateRef } from "vue";

import useQuery from "@/composables/useQuery";
import { debounce } from "@/shared/utils";

import composables from "./composables";
import LiveSearchVariants from "./LiveSearchVariants.vue";

const SYMBOLS_THRESHOLD = 3;
const DEBOUNCE_SEARCH_TIMEOUT = 500;

const props = defineProps<{
  onSearch: (q: string) => Promise<T[]>;
}>();

const emit = defineEmits<{
  onSelect: [variant: T];
  onUnselect: [];
}>();

const inputRef = useTemplateRef("input");

const {
  variants,
  query: queryVariants,
  clear: clearVariants,
} = useQuery(props.onSearch);

const { selectedVariant, selectVariant, unselectVariant, selectByPosition } =
  composables.useVariantSelection({
    variants,
    onSelect: (selectedVariant) => {
      emit("onSelect", selectedVariant);
    },
  });

const {
  isOpened: dropDownIsOpened,
  close: closeDropdown,
  open: openDropdown,
} = composables.useDropdownState();

const {
  selectedPosition,
  incrementPosition,
  decrementPosition,
  resetPosition,
} = composables.useSelectedPosition(computed(() => variants.value.length));

const { keyDownHandler: onKeyDown } = composables.useKeyboardHandlers({
  onEnter: () => {
    selectByPosition(selectedPosition.value);

    resetState();
  },
  onEscape: closeDropdown,
  onArrowDown: incrementPosition,
  onArrowUp: decrementPosition,
});

function onInput(q: string) {
  if (q.length < SYMBOLS_THRESHOLD) {
    return false;
  }

  queryVariants(q);
}

function resetState() {
  closeDropdown();
  clearVariants();
  resetPosition();
}

const debouncedOnInput = debounce(onInput, DEBOUNCE_SEARCH_TIMEOUT);
</script>

<template>
  <div class="livesearch" @keydown="onKeyDown" @click="openDropdown">
    <div class="livesearch__input-area input-area">
      <div
        v-if="selectedVariant"
        class="input-area__selected-variant selected-variant"
      >
        <div class="selected-variant__title">
          {{ selectedVariant.name ?? selectedVariant.alias }}
        </div>

        <div
          class="selected-variant__remove-btn"
          @click="
            () => {
              unselectVariant();
              emit('onUnselect');

              nextTick(() => {
                inputRef?.focus();
              });
            }
          "
        />
      </div>

      <div v-else class="input-area__input">
        <input
          ref="input"
          type="text"
          @input="
            (e) => debouncedOnInput((e.currentTarget as HTMLInputElement).value)
          "
        />
      </div>
    </div>

    <div v-if="dropDownIsOpened" class="livesearch__variants variants">
      <LiveSearchVariants
        :selected-position="selectedPosition"
        :variants="variants"
        @was-selected="
          (newSelectedVariant) => {
            selectVariant(newSelectedVariant);

            resetState();
          }
        "
      >
        <template #default="{ variant }">
          <slot name="dropdown-variant" :variant="variant" />
        </template>
      </LiveSearchVariants>
    </div>
  </div>
</template>

<style scoped>
.selected-variant {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c8dced;
  height: 32px;
  padding: 5px 10px;
  gap: 10px;
  width: 150px;
  box-sizing: border-box;

  .selected-variant__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .selected-variant__remove-btn {
    background-color: #eee;
    height: 100%;
    flex: 0 0 20px;
    cursor: pointer;
  }
}

.livesearch {
  width: 300px;
  border: 1px solid black;
  height: 48px;
  box-sizing: border-box;
}

.livesearch__input-area {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.input-area__selected-variant {
  margin-left: 10px;
}

.input-area__input {
  width: 100%;
  height: 100%;

  input {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 100%;
  }
}
</style>
