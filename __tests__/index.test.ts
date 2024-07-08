import { Chained } from "../src/provider/Logger/Chained";
import { chained } from "../src/template/logger";
import { terminal } from "../src/template/target";

const logger = {
    chained: {
        template: chained.terminal,
        configured: new Chained<"general" | "special">({
            targets: [terminal],
            level: {
                current: "general",
                map: {
                    general: {
                        global: {
                            format: {
                                color: [255, 255, 255],
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
    .level("info")

    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.")

    .prefixOff()
    .line()
    .desc(
        "---------------------------------------------------------------------------\n"
    )
    .prefixOn();

logger.chained.template
    .prefixOff()
    .level("info")

    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.")

    .line()
    .desc(
        "---------------------------------------------------------------------------\n"
    );

logger.chained.configured
    .level("general")

    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.")

    .prefixOff()
    .line()
    .desc(
        "---------------------------------------------------------------------------\n"
    )
    .prefixOn();

logger.chained.configured
    .level("special")

    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.")

    .prefixOff()
    .line()
    .desc(
        "---------------------------------------------------------------------------\n"
    )
    .prefixOn();
