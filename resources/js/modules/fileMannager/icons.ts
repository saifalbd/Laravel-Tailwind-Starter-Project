import { svg } from "redom";


export const icons = {
    svg(arg: { viewBox: string }, path: string | any[]) {
        let p = undefined;
        if (Array.isArray(path)) {
            p = path
        } else {
            p = svg("path", { d: path });
        }

        return svg(
            "svg",
            {
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                ...arg,
            },
            p
        );
    },
    refresh(){
        return this.svg({viewBox:"0 0 20 20"},[
            svg('path',{stroke:"currentColor",'stroke-linecap':"round",'stroke-linejoin':"round",
            'stroke-width':"2",
            d:"M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})
        ])
    },
    info(){

        const path = svg("path", {
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        });
        return this.svg({viewBox:'0 0 20 20'},[path])
    },
    success(){
        return this.svg({viewBox:'0 0 20 20'},[
            svg("path", {
                d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z",
            })
        ])
    },
    alert(){
        return this.svg({ viewBox:"0 0 24 24"}, [
            svg("path", {
                d: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12M11 7V13H13V7M11 15V17H13V15Z",
            }),
            
        ]);
    },
    save() {
        return this.svg({ viewBox: "0 0 20 20" }, [
            svg("path", {
                d: "M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z",
            }),
            svg("path", {
                d: "M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
            }),
        ]);
    },
    remove() {
        const path = svg("path", {
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z",
        });

        return this.svg({ viewBox: "0 0 18 20" }, [path]);
    },
    close(){
   
        return this.svg({viewBox:'0 0 14 14'},[
            svg('path',{
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6",
            })
        ])
    },
    select() {
        return this.svg({ viewBox: "0 0 18 20" }, [
            svg("path", {
                d: "M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z",
            }),
            svg("path", {
                d: "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z",
            }),
        ]);
    },
    edit() {
        return this.svg({ viewBox: "0 0 18 20" }, [
            svg("path", {
                d: "M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z",
            }),
            svg("path", {
                d: "M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z",
            }),
        ]);
    },
    menu() {
        const path = svg("path", {
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.0",
        });

        return this.svg({ viewBox: "0 0 17 10" }, [path]);
    },
    attach(){
        return this.svg({ viewBox: "0 0 16 20" }, [
            svg("path", {
                d: "M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z",
            }),
            svg("path", {
                d: "M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z",
            }),
        ]);
    }
};
