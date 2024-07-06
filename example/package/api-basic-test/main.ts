import { template } from "jaslog";

const logger = template.chained.terminal;

logger
    .level("info")
    .line()
    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.");
