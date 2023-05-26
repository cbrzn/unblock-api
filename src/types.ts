export interface Step {
  name: string;
  snippet: String;
  result?: string;
}

export interface Workflow {
  name: string;
  steps: Step[];
  result?: string
}
