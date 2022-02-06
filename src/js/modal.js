import $ from "jquery";

$("[data-modal]").each((_, el) => {
    const element = $(el);

    const modal = $(element.data("modal"));
    const modalWrapper = $(modal.find(".modal-wrapper"));
    const modalArea = $(modal.find(".modal-area"));
    const modalClose = $(modal.find(".modal-close"));

    element.on("click", () => {
        modal.show();
        modalWrapper.fadeIn();
    });

    const closeModal = () => {
        modalWrapper.fadeOut({
            duration: 150,
            complete: () => {
                modal.hide();
            },
        });
    }

    modalArea.on("click", (e) => {
        const target = $(e.target);
        if (target.length && target.hasClass("modal-area")) {
            closeModal();
        }
    });

    modalClose.on("click", closeModal);
});
