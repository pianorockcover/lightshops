import $ from "jquery";
import { detect } from "detect-browser";

const browser = detect();

if (!browser || browser.name !== "chrome") {
    $(".cross-browser-hint").css("display", "flex");
}
