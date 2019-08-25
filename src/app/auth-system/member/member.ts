/**
 * @author: zhu.wenjian
 * @date: 5/3/19
 * @description:
 */
import {IdentityModel} from "../../core/core";

export interface Member extends IdentityModel {
  username?: string;
  loginName?: string;
  telephone?: string;
  password?: string;
  email?: string;
  beginValidTime?: string;
  endValidTime?: string;
  picUrl?: string;
  gender?: string;
  birthDay?: Date;
  age?: number;
  mobile?: string;
  abbreviation?: string;
}


