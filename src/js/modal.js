import $ from "jquery";

$("[data-modal]").each((_, el) => {
    const element = $(el);

    const modal = $(element.data("modal"));
    const modalContent = $(modal.find(".modal-content"));
    const modalArea = $(modal.find(".modal-area"));
    const modalClose = $(modal.find(".modal-close"));

    element.on("click", () => {
        modal.show();
        modalContent.fadeIn();
    });

    const closeModal = () => {
        modalContent.fadeOut({
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
