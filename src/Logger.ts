import { Target } from "./Target";
import Chain from "./Chain";
import {
    LoggerLevelDefault,
    LoggerLevel,
    LoggerLevelMapDefault,
} from "./Level";

type Config<LoggerLevels extends string> = {
    target?: Target;
    levels?: {
        info: LoggerLevel<LoggerLevels>["map"];
        initial: LoggerLevel<LoggerLevels>["current"];
    };
};

const terminal: Target = {
    write: (data) => process.stdout.write(data),
};

class Logger<LoggerLevels extends string = LoggerLevelDefault> {
    public target: Target;
    public chain: Chain<LoggerLevels>;

    constructor(config?: Config<LoggerLevels>) {
        this.target = config?.target ?? terminal;

        if (config?.levels) {
            this.chain = new Chain(this.target, {
                map: config.levels.info,
                current: config.levels.initial,
            });

            return;
        }

        this.chain = new Chain(this.target, {
            current: LoggerLevelMapDefault.info,
            map: LoggerLevelMapDefault,
        } as LoggerLevel<LoggerLevels>);
    }
}

export default Logger;
