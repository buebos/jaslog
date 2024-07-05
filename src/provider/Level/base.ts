import LoggerLevel from "../../core/LoggerLevel";

type Levels = "info" | "warn" | "error" | "debug";

const base: LoggerLevel<Levels> = {
    info: {},
    warn: {},
    error: {},
    debug: {},
};

export default base;
