import Handlebars from "handlebars";
import fse from "fs-extra"
import { Workflow } from "./types";

export const renderTemplate = (workflow: Workflow, userId: string) => {
  const templateSource = fse.readFileSync("./templates/invoke")
  const renderInvokeTemplate = Handlebars.compile(templateSource);

  const renderedSource = renderInvokeTemplate(workflow)
  fse.ensureDirSync("./workflows")
  fse.writeFileSync(`./workflows/${userId}.ts`, renderedSource)
}