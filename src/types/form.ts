import {
  RuleItem,
  Rules,
  ValidateSource,
  ValidateOption,
} from "async-validator";

export interface ValidationRule extends RuleItem {
  trigger?: "blur" | "change";
}

export type Validator = (
  rule: Rules,
  value: any,
  callback: (error: string | string[] | void) => void,
  source: ValidateSource,
  options: ValidateOption
) => void;
