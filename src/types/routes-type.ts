export interface IRoutes {
  key?: string;
  title?: string;
  keywords?: string;
  defaultOpen?: boolean;
  path?: string;
  routes?: IRoutes[];
}