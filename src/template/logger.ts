import { LevelBaseKeys, base } from "../provider/Level/base";
import { Chained } from "../provider/Logger/Chained";
import { terminal } from "./target";

export const chained = {
    terminal: new Chained<LevelBaseKeys>({
        level: { current: "info", map: base },
        targets: [terminal],
    }),
};
