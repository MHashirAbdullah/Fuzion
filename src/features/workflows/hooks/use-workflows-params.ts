import { useQueryStates } from "nuqs"
import { workflowsParams } from "../params";

export const useworkflowsParams  = () =>{
  return useQueryStates(workflowsParams)
}
