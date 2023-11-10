import { el, mount, unmount } from "redom";
import { icons } from "./icons";

type Arg = {
    status: number;
    message: string | string[];
};

export class Toast {
    public el: HTMLElement;

    public constructor(arg: Arg) {
        var isError = false;

        const status = arg.status;
        let title = `Suceess ${status}`;
        if (status > 400) {
            title = `Error ${status}`;
            isError = true;
        }
        let cls = "toast success";
        if (isError) {
            cls = "toast";
        }

        const message = arg.message;
        var list: HTMLElement | HTMLElement[] = el("li");
        if (Array.isArray(message)) {
            list = message.map((e) =>
                el("li", { class: "list-item" }, [icons.info(), el("span", e)])
            );
        } else {
            list = el("li", { class: "list-item" }, [
                icons.info(),
                el("span", message),
            ]);
        }

        const footClose = el("button", { class: "close-btn" }, [
            icons.info(),
            el("span", { class: "ml-2" }, "Close"),
        ]);
        const rightClose = el(
            "button",
            {
                type: "button",
                class: "right",
            },
            [icons.close()]
        );

        this.el = el("div", { class: cls }, [
            el("div", { class: "flex-box" }, [
                el("div", { class: "left" }, [
                    icons.refresh(),
                    el("span", { class: "sr-only" }, "Refresh icon"),
                ]),
                
                    el("div", { class: "middle" }, [
                        el("div", { class: "title-message" }, title),
                        el("ul", { class: "list" }, list),
                        el("div", { class: "foot" }, [
                            el(
                                "div",
                                {
                                    class: "flex w-full justify-center items-center",
                                },
                                [footClose]
                            ),
                        ]),
                    ]),
                    
              
                rightClose,
            ]),
        ]);

        footClose.addEventListener("click", () => {
            unmount(document.body, this.el);
        });
        rightClose.addEventListener("click", () => {
            unmount(document.body, this.el);
        });
    }

    show() {
        mount(document.body, this.el);
    }
}
