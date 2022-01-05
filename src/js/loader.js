import $ from "jquery";

setTimeout(() => {
    $(".loader").fadeOut({
        duration: 100,
        complete: () => {
            $(".loader").remove();
        }
    })
}, 1000);