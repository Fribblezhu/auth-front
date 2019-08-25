import {IdentityModel, RestResponse} from "../core";



export interface PageParameter {
  pageIndex: number;
  pageSize: number;
  direction?: Direction;
  properties?: [string];
}

export enum Direction {
  ASC, DESC
}


export interface Page<T> {
  content: Array<T>;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export function getEmptyPage(): Page<any> {
  return {
    content: [],
    number: 0,
    size: 15,
    totalElements: 0,
    totalPages: 0,
  };
}


export class PageDataComponent<T extends IdentityModel> {
  protected pageParameter: PageParameter = {pageIndex: 1, pageSize: 15};
  protected page: Page<T> = getEmptyPage();
  protected mapOfCheckedId: { [key: string]: boolean } = {};
  protected isAllDisplayDataChecked = false;
  protected isIndeterminate: boolean;
  protected numberOfChecked: number;
  protected loading: boolean;

  protected checkAll(value: boolean): void {
    this.page.content.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  protected refreshStatus(): void {
    this.isAllDisplayDataChecked = this.page.content
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.page.content.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.page.content.filter(item => this.mapOfCheckedId[item.id]).length;
  }
  protected  queryPage(reset: boolean = false) {
    throw  new Error('继承PageDataComponent的组件,必须覆盖queryPage方法.');
  }
}
