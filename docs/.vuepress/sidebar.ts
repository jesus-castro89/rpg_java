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
            text: "1.- El personaje, Los items y las armaduras",
            collapsible: true,
            icon: "user",
            children: ["guide/player/README.md", "guide/player/armors.md"]
        },
        {
            text: "2.- El Inventario",
            collapsible: true,
            icon: "briefcase",
            children: ["guide/player/inventory.md"]
        },
        {
            text: "3.- Las utilidades",
            collapsible: true,
            icon: "briefcase",
            children: ["guide/utilities/README.md", "guide/utilities/exceptions.md",
                "guide/utilities/BackGroundPanel.md",]
        },
        {
            text: "4.- Los enemigos",
            collapsible: true,
            icon: "wand-sparkles",
            children: ["guide/enemies/README.md", "guide/enemies/factory.md", "guide/enemies/example.md"]
        },
        {
            text: "5.- Gestionando Archivos y Datos",
            collapsible: true,
            icon: "gamepad",
            children: ["guide/data/README.md", "guide/data/update.md"]
        },
    ]
});
