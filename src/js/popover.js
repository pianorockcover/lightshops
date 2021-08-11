import $, { event } from "jquery";

// TMP !!!
const isMobile = false;

const showClass = "show";
const hideClass = "hide";

$("[data-toggle]").each((_, el) => {
  const popover = $(el);
  const trigger = popover.data("trigger");
  const targetSelector = popover.data("target");
  const target = $(targetSelector);

  let shown = false;

  if (!target) {
    console.error(`No popover target element with selector ${target}`);
    return;
  }

  if (!trigger || trigger === "click" || isMobile) {
    popover.on("click", () => {
      target.addClass(showClass);
      target.removeClass(hideClass);
      shown = true;
    });

    $(document).on("mouseup", (event) => {
      if (!target.is(event.target) && target.has(event.target).length === 0) {
        target.removeClass(showClass);
        target.addClass(hideClass);
        shown = false;
      }
    });

    return;
  }

  popover.on("mouseover", () => {
    target.addClass(showClass);
    target.removeClass(hideClass);
  });

  popover.on("mouseout", () => {
    target.addClass(hideClass);
    target.removeClass(showClass);
  });
});
