export interface Step {
  name: string;
  snippet: string;
  result?: string | null;
}

export interface Workflow {
  name: string;
  steps: Step[];
  result?: string;
}
