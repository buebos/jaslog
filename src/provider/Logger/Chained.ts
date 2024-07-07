import type { LevelSection, LoggerConfig } from "../../core/Logger";
import Logger from "../../core/Logger";

type ChainedAc = {
    type: LevelSection;
    data: string;
};

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
    private ac: ChainedAc[] = [];

    constructor(config: ChainedConfig<Levels>) {
        this.execute = config?.executeStrategy || this.execute;

        this.logger = new Logger<Levels>({
            targets: config.targets,
            level: config.level,
        });
    }

    level(key: Levels) {
        this.logger.setLevel(key);
        this.ac = [];

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
        if (this.execute == "accumulate") {
            this.ac.push({ type: "title", data: message });

            return this;
        }

        this.logger.line(message, "title");
        return this;
    }

    desc(message?: string): Chained<Levels> {
        if (!message) {
            this.logger.line();
            return this;
        }

        if (this.execute == "accumulate") {
            this.ac.push({ type: "desc", data: message });

            return this;
        }

        this.logger.line(message, "desc");

        return this;
    }

    line(): Chained<Levels> {
        this.logger.line();

        return this;
    }

    out() {
        if (this.execute == "immediate") {
            return;
        }

        for (const message of this.ac) {
            if (!message) {
                this.logger.line();
                continue;
            }

            this.logger.line(message.data, message.type);
        }

        this.ac = [];
    }
}
