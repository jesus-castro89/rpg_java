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
            children: ["guide/player/README.md", "guide/player/armors.md"]
        },
        {
            text: "2.- Los enemigos",
            collapsible: true,
            icon: "wand-sparkles",
            children: ["guide/enemies/structure.md", "guide/enemies/README.md", "guide/enemies/player.md"]
        },
        {
            text: "3.- El Inventario y los Items",
            collapsible: true,
            icon: "briefcase",
            children: ["guide/inventory/structure.md", "guide/inventory/item.md", "guide/inventory/README.md"]
        },
        {
            text: "4.- El primer ciclo de juego",
            collapsible: true,
            icon: "gamepad",
            children: ["guide/interactions/structure.md", "guide/interactions/README.md", "guide/interactions/drop.md",
                "guide/interactions/items.md", "guide/interactions/player.md", "guide/interactions/game.md",
                "guide/interactions/file.md"]
        },
    ]
});
