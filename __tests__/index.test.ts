import { LoggerLevel } from "../src/Level";
import Logger from "../src/Logger";

const levels: LoggerLevel<"information">["map"] = {
    information: { color: { title: [0, 150, 20] } },
};

const logger = new Logger<"information">({
    levels: {
        initial: levels.information,
        info: levels,
    },
});

logger.chain.set("information").title("✅ Tests passed.").desc();
