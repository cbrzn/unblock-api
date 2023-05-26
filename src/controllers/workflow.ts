import { Router, Request, Response, NextFunction } from "express";
import fse from "fs-extra";
import { renderTemplate } from "../templates/render";

export const workflowRouter = Router();

const createWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workflow = (req.body as any).workflow;
    const userId = (req.body as any).userId;

    renderTemplate(workflow, userId);

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const getWorkflow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId as string;
    const workflowPath = `${__dirname}/../../workflows/${userId}.ts`;
    const workflowExists = fse.existsSync(workflowPath);

    if (!workflowExists) {
      return res
        .status(404)
        .send(`User with id ${userId} does not has created a workflow`);
    }

    const workflow = fse.readFileSync(workflowPath, "utf-8");
    return res.status(200).send(workflow);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const runWorkflow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId as string;
    const workflowPath = `${__dirname}/../../workflows/${userId}.ts`;
    const workflowExists = fse.existsSync(workflowPath);

    if (!workflowExists) {
      throw new Error(`User with id ${userId} does not has created a workflow`);
    }

    const { invoke } = await import(workflowPath);
    const workflow = await invoke();
    console.log(workflow);
    res.send(200);
  } catch (err) {
    next(err);
  }
};

workflowRouter.post("/", createWorkflow);
workflowRouter.get("/:userId", getWorkflow);
workflowRouter.post("/:userId", runWorkflow);
