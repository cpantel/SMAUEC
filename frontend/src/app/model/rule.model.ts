import {Action} from "./action.model";

export class Rule {
  id: number;
  name: string;
  topic: string;
  description: string;
  is_enabled: boolean;
  activation_value: string;
  duration: number;
  action: Action;
}
