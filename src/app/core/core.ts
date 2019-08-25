
export interface RestResponse<T> {
  message: string;
  code: string;
  status: number;
  timestamp: number;
  data: T;
}

export interface IdentityModel {
  id?: string;
}

export interface ComboBoxModel {
  label?: string;
  value?: string;
  disabled?: boolean;
}

