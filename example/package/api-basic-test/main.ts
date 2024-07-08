import { template } from "jaslog";

const logbp = template.blueprint.terminal;
const logger = template.chained.terminal;

logger
    .level("info")
    .line()
    .title("Hello.")
    .line()
    .desc("This is a message from the example/package/api-basic-test module")
    .desc("testing jaslog npm package.");

logbp.line();
logbp.line();

logbp.error({
    title: "Dependency manager missing.",
    desc:
        "Your system does not have any of the supported dependency managers " +
        "installed. The create-next-kit requires at least one of the " +
        "following dependency managers to function properly. Please install " +
        "one of the following based on your project's dependency " +
        "requirements:",
});
