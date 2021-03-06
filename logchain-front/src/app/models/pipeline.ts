import {Job} from "./job";

export interface Pipeline {
  id?: number,
  status?: string,
  branch?: string,
  commit?: string,
  jobs?: Job[],
}
