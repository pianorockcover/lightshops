import $ from "jquery";
import { hideClass, showClass, shownClass } from "./toggle";

$("[data-close]").each((_, el) => {
  const element = $(el);
  const targetSelector = element.data("close");
  const target = $(targetSelector);

  if (!target) {
    console.error(`No element target element with selector ${target}`);
    return;
  }

  element.on("click", () => {
    target.removeClass(showClass);
    target.addClass(hideClass);
    target.removeClass(shownClass);
  });
});
