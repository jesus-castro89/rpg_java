import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        {
            text: "El Proyecto",
            icon: "book",
            prefix: "guide/",
            link: "guide/"
        },
        {
            text: "Los paquetes",
            icon: "folder",
            link: "guide/structure.md"
        },
        {
            text: "1.- El personaje",
            collapsible: true,
            icon: "user",
            children:["guide/player/README.md", "guide/player/armors.md"]
        },
    ]
});
