import { template, Chained } from "jaslog";

const logger = {
    template: { chained: template.chained },
};

logger.template.chained
    .set("info")
    .line()
    .title("Hello.")
    .line()
    .desc()
    .line("This is a message from the example/package/api-basic-test module")
    .line("testing jaslog npm package.");
