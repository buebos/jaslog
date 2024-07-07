import Logger, { LoggerLevel } from "../../core/Logger";
import { Target } from "../../core/Target";

type Config<Levels extends string> = {
    level: LoggerLevel<Levels>;
    targets: Target[];
};

type Message = {
    titles?: string[];
    lines?: string[];
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

    write(message: Message) {
        if (message.titles) {
            for (const title of message.titles) {
                this.logger.line(title, "title");
            }
        }

        if (message.lines) {
            for (const line of message.lines) {
                this.logger.line(line, "desc");
            }
        }
    }
}
