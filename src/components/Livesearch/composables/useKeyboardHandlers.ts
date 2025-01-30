const KEY_CODES = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ESCAPE: "Escape",
  ENTER: "Enter",
};

type Fn = () => void;

type KeyboardHandlers = {
  onEscape: Fn;
  onEnter: Fn;
  onArrowDown: Fn;
  onArrowUp: Fn;
};

export default function useKeyboardHandlers(
  keyboardHandlers: KeyboardHandlers,
) {
  function keyDownHandler(e: KeyboardEvent) {
    switch (e.code) {
      case KEY_CODES.ARROW_DOWN:
        e.preventDefault();
        keyboardHandlers.onArrowDown();

        break;

      case KEY_CODES.ARROW_UP:
        e.preventDefault();
        keyboardHandlers.onArrowUp();

        break;

      case KEY_CODES.ESCAPE:
        e.preventDefault();
        keyboardHandlers.onEscape();

        break;

      case KEY_CODES.ENTER:
        e.preventDefault();
        keyboardHandlers.onEnter();

        break;

      default:
        break;
    }
  }

  return {
    keyDownHandler,
  };
}
