import Logger, { LoggerLevel } from "jaslogger";

const levels: LoggerLevel<"information">["map"] = {
    information: { color: { title: [255, 0, 0] } },
};

const logger = new Logger<"information">({
    levels: {
        initial: levels.information,
        info: levels,
    },
});

logger.chain.set("information").title("Hello.").desc();
