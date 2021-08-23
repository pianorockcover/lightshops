import $ from "jquery";

// TMP !!!
const isMobile = false;

export const showClass = "show";
export const shownClass = "shown";
export const hideClass = "hide";

$("[data-toggle]").each((_, el) => {
  const element = $(el);
  const trigger = element.data("trigger");
  const targetSelector = element.data("toggle");
  const target = $(targetSelector);

  let shown = false;

  if (!target) {
    console.error(`No element target element with selector ${target}`);
    return;
  }

  if (!trigger || trigger === "click" || isMobile) {
    element.on("click", () => {
      target.addClass(showClass);
      target.removeClass(hideClass);
      shown = true;
    });

    $(document).on("mouseup", (event) => {
      if (!target.is(event.target) && target.has(event.target).length === 0) {
        target.removeClass(showClass);
        target.removeClass(shownClass);
        target.addClass(hideClass);
        shown = false;
      }
    });

    return;
  }

  element.on("mouseenter", () => {
    target.addClass(showClass);
    target.removeClass(hideClass);
  });

  element.on("mouseout", () => {
    target.addClass(hideClass);
    target.removeClass(showClass);
    target.removeClass(shownClass);
  });
});
