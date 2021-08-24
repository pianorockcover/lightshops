import $ from "jquery";

class Favourite {
    items = [1];

    constructor() {
        $("[data-add-to-favourite]").each((_, el) => {
            const element = $(el);
            const productId = element.parent()
                .closest("[data-product-id]")
                .data("product-id");

            element.on("click", () => {
                if (this.items.includes(productId)) {
                    this.items = this.items.filter((id) => id !== productId);
                } else {
                    this.items.push(productId);
                }

                this.refresh();
            });
        });

        this.refresh();
    }

    refresh = () => {
        this.items = $.uniqueSort(this.items);
        $(".product-in-favourite").removeClass("product-in-favourite");

        for (let product of this.items) {
            $(`[data-product-id="${product}"]`).addClass("product-in-favourite");
        }

        $("[data-in-favourite-amount]").html(this.items.length);

        if (!this.items.length) {
            $("[data-in-favourite-amount]").css("display", "none");
        } else {
            $("[data-in-favourite-amount]").css("display", "flex");
        }
    }
}

const favourite = new Favourite();
favourite.refresh();