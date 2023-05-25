import { Router, Request, Response, NextFunction } from "express";
import fse from "fs-extra"
import { renderTemplate } from "../renderTemplate";

export const workflowRouter = Router()

const createWorkflow = async (req: Request, res: Response) => {
  try {
    const workflow = (req.body as any).workflow
    const userId = (req.body as any).userId

    renderTemplate(workflow, userId)

    return res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

const getWorkflow = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string
    let workflowPath = `../workflows/${userId}.ts`
    const workflowExists = fse.existsSync(workflowPath)
    
    if (workflowExists) {
      const workflow = fse.readJSONSync(workflowPath)
      return res.status(200).send(workflow)
    }

    
  } catch (err) {
    next(err)
  }
}


workflowRouter.post('/', createWorkflow);
workflowRouter.get("/:userId", )
