export interface Step {
  name: string,
  snippet: string,
  result: string
}

export interface Workflow {
  name: string,
  steps: Step[]
}
