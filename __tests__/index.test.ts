import { chained as logger } from "../src/template/logger";

logger
    .set("info")
    .line()
    .title("Hello.")
    .desc()
    .line("This is a message from the __tests__/index.test.ts basic module")
    .line("testing jaslogger npm package.");
