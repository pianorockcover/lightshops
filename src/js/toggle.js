import $ from "jquery";

// TMP !!!
const isMobile = false;

export const toggledClass = "toggled";
export const activeClass = "active";

const toggleAnimation = (el, effect, options = {}, onComplete) => {
  el[`${effect}Toggle`]({
    duration: 300,
    ...options
  });
  onComplete();
}

$("[data-toggle]").each((_, el) => {
  const element = $(el);
  const trigger = element.data("trigger");
  const targetSelector = element.data("toggle");
  const target = $(targetSelector);

  if (!target) {
    console.error(`No element target element with selector ${target}`);
    return;
  }

  const effect = element.data("effect") || "fade";

  const hideOnClickAside = element.data("hide-aside") || false;

  const onComplete = () => {
    target.toggleClass(activeClass);
    element.toggleClass(toggledClass);
  }

  if (!trigger || trigger === "click" || isMobile) {
    element.on("click", () =>
      toggleAnimation(target, effect, {}, onComplete));

    if (hideOnClickAside) {
      $(document).on("mouseup", (event) => {
        if (!target.is(event.target) && target.has(event.target).length === 0) {
          // ???
          // toggleAnimation(target, effect, {}, onComplete)
        }
      });
    }

    return;
  }

  // Hover
  // element.on("mouseover", () => {
  //   target.addClass(showClass);
  //   target.removeClass(hideClass);
  // });

  // element.on("mouseout", () => {
  //   target.addClass(hideClass);
  //   target.removeClass(showClass);
  //   target.removeClass(shownClass);
  // });
});
