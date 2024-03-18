import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
    hostname: "https://jesus-castro89.github.io/rpg_java/",
    breadcrumb: false,
    author: {
        name: "M. en E. Jesús Aurelio Castro Magaña",
        url: "https://github.com/jesus-castro89",
    },
    iconAssets: "fontawesome-with-brands",
    logo: "images/logo.svg",
    docsDir: "src",
    // navbar
    navbar,
    // sidebar
    sidebar,
    displayFooter: true,
    plugins: {
        components: {
            components: ["Badge", "VPCard"],
        },
        // All features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            alert: true,
            attrs: true,
            codetabs: true,
            component: true,
            demo: true,
            figure: true,
            footnote: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            mark: true,
            tasklist: true,
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            // install flowchart.ts before enabling it
            flowchart: true,

            // install chart.js before enabling it
            // chart: true,

            // insert component easily

            // install echarts before enabling it
            // echarts: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            // install katex before enabling it
            // katex: true,

            // install mathjax-full before enabling it
            // mathjax: true,

            // install mermaid before enabling it
            // mermaid: true,

            // playground: {
            //   presets: ["ts", "vue"],
            // },

            // install reveal.js before enabling it
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            // install @vue/repl before enabling it
            // vuePlayground: true,

            // install sandpack-vue3 before enabling it
            // sandpack: true,
        },

        // install vuepress-plugin-pwa2 and uncomment these if you want a PWA
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
});
