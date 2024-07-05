import { chained as logger } from "../../../src/template/logger";

logger
    .set("info")
    .line()
    .title("Hello.")
    .line()
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslogger npm package.");
