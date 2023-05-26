import Handlebars from "handlebars";
import fse from "fs-extra";
import { Workflow } from "../types";

export const renderTemplate = (workflow: Workflow, userId: string) => {
  const templateSource = fse.readFileSync(__dirname + "/workflow.hbs", "utf-8");

  Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context);
  });
  const renderInvokeTemplate = Handlebars.compile(templateSource);

  const renderedSource = renderInvokeTemplate({ workflow });

  // return renderedSource
  fse.ensureDirSync("./workflows");
  fse.writeFileSync(`./workflows/${userId}.ts`, renderedSource);
};
