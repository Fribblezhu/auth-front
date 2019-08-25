import {ComboBoxModel, IdentityModel} from "../../core/core";

export interface Code extends IdentityModel {
  name?: string;
  parentId?: string;
  code?: string;
  sortIndex?: number;
  status?: number;
  isSystem?: string;
  groupKey?: string;
  comment?: string;
  codecList?: Array<ComboBoxModel>;
}
