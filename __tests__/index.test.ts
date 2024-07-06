import { template, Chained } from "../index";

const logger = {
    chained: {
        template: template.chained,
        configured: new Chained<"general" | "special">({
            level: {
                current: "general",
                map: {
                    general: {
                        global: {
                            format: {
                                color: [255, 255, 255]
                            },
                            prefix: {
                                label: "General",
                                format: { color: [200, 0, 200] },
                            },
                        },
                    },
                    special: {
                        title: {
                            prefix: {
                                label: "Special:Title:Prefix",
                                format: { color: [100, 150, 180] },
                            },
                        },
                        desc: {
                            prefix: {
                                label: "Special:Desc:Prefix",
                                format: { color: [180, 90, 255] },
                            },
                        },
                    },
                },
            },
        }),
    },
};

logger.chained.template
    .set("info")
    .line()
    .title("Hello.")
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslog npm package.");

logger.chained.configured
    .set("general")
    .line()
    .title("Hello.")
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslog npm package.");
logger.chained.configured
    .set("special")
    .line()
    .title("Hello.")
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslog npm package.");
