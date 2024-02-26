import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "Guía",
        link: "/guide/README.md",
        icon: "book",
        activeMatch: "^/guide/$",
    },
]);
