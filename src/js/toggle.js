import $ from "jquery";

// TMP !!!
const isMobile = false;

export const toggledClass = "toggled";
export const activeClass = "active";

const toggleAnimation = (el, effect, options = {}, onComplete = () => { }, type = "Toggle") => {
  el[`${effect}${type}`]({
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
  const animationDuration = element.data("animation-duration");

  const hideOnClickAside = element.data("hide-aside") || false;

  const onComplete = () => {
    target.toggleClass(activeClass);
    element.toggleClass(toggledClass);
  }

  if (!trigger || trigger === "click" || isMobile) {
    element.on("click", () =>
      toggleAnimation(target, effect, {
        duration: animationDuration,
      }, onComplete));

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

  if (trigger === 'hover') {
    element.hover(() => {
      if (element.data("align-top")) {
        target.css("top", element[0].getBoundingClientRect().top);
      }

      toggleAnimation(target, effect, {
        duration: animationDuration,
      }, onComplete);
    });
  }
});
