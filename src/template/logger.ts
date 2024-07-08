import { LevelBaseKeys, base } from "./base";
import { Blueprint } from "../provider/Logger/Blueprint";
import { Chained } from "../provider/Logger/Chained";
import { terminal } from "./target";

export const chained = {
    terminal: new Chained<LevelBaseKeys>({
        level: { current: "info", map: base },
        targets: [terminal],
    }),
};
export const blueprint = {
    terminal: Blueprint.create({
        level: base,
        targets: [terminal],
    }),
};
