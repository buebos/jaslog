import type { LoggerConfig } from "../../core/Logger";
import Logger from "../../core/Logger";

type ChainedExecuteStrat = "accumulate" | "immediate";

type ChainedConfig<Levels extends string> = LoggerConfig<Levels> & {
    executeStrategy?: ChainedExecuteStrat;
};

/**
 * Logger with methods prioritizing chaining strategy for
 * building messages.
 */
export class Chained<Levels extends string> {
    public execute: ChainedExecuteStrat = "immediate";

    private logger: Logger<Levels>;

    constructor(config: ChainedConfig<Levels>) {
        this.execute = config?.executeStrategy || this.execute;

        this.logger = new Logger<Levels>({
            targets: config.targets,
            level: config.level,
        });
    }

    level(key: Levels) {
        this.logger.setLevel(key);
        return this;
    }
    prefixOn() {
        this.logger.isPrefixEnabled = true;
        return this;
    }
    prefixOff() {
        this.logger.isPrefixEnabled = false;
        return this;
    }

    title(message: string): Chained<Levels> {
        this.logger.line(message, "title");
        return this;
    }

    desc(message?: string): Chained<Levels> {
        if (!message) {
            return this;
        }

        this.logger.line(message, "desc");

        return this;
    }

    line(message?: string): Chained<Levels> {
        if (!message) {
            this.logger.line();

            return this;
        }

        return this.desc(message);
    }

    out() {}
}
