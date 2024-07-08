import Logger, { LoggerLevel } from "../../core/Logger";
import { Target } from "../../core/Target";

type Config<Levels extends string> = {
    level: LoggerLevel<Levels>;
    targets: Target[];
};

type Message = {
    title?: string;
    desc?: string;
};

type BlueprintLevelWrite = (message: Message) => void;

type BlueprintWithLevelMethods<Levels extends string> = Blueprint<Levels> & {
    [key in Levels]: BlueprintLevelWrite;
};

export class Blueprint<Levels extends string> {
    private logger: Logger<Levels>;

    private constructor(config: Config<Levels>) {
        this.logger = new Logger<Levels>({
            level: {
                current: Object.keys(
                    config.level
                )[0] as keyof typeof config.level,
                map: config.level,
            },
            targets: config.targets,
        });

        for (const level of Object.keys(config.level)) {
            (this as Record<string, unknown>)[level] = (message: Message) => {
                this.logger.setLevel(level as Levels);
                this.write(message);
            };
        }
    }

    public static create<Levels extends string>(
        config: Config<Levels>
    ): BlueprintWithLevelMethods<Levels> {
        return new Blueprint(
            config
        ) as unknown as BlueprintWithLevelMethods<Levels>;
    }

    private write(message: Message) {
        if (message.title) {
            this.logger.line(message.title, "title");
            this.logger.line();
        }

        if (message.desc) {
            this.logger.line(message.desc, "desc");
        }
    }

    line() {
        this.logger.line();
    }
}
