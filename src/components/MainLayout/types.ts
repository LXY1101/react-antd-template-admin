import { ReactNode } from 'react';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];
export interface ITabsProps {
  route: string;
  label: ReactNode;
  key: string;
  closable?: boolean;
  children?: ReactNode;
}

export interface IRouter {
  [propName: string]: any;
}
