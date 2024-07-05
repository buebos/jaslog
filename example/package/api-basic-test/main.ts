import { template } from "jaslogger";

const logger = template.chained;

logger
    .set("info")
    .line()
    .title("Hello.")
    .line()
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslogger npm package.");
