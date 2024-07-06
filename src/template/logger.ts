import base, { LevelDefaults } from "../provider/Level/base";
import { Chained } from "../provider/Logger/Chained";
import { terminal } from "./target";

export const chained = {
    terminal: new Chained<LevelDefaults>({
        level: { current: "info", map: base },
        targets: [terminal],
    }),
};
