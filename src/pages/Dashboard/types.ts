export type TDashboardDetailsItem = {
  h: number;
  id: string;
  reports: [];
  w: number;
  x: number;
  y: number;
  name: string;
  type: string;
} & {
  [key: string]: {
    id: string;
    name: string;
    type: string;
  };
} & {
  text: string;
};

export type TDashboardDetails = {
  access: {
    manage: boolean;
    externalize: boolean;
    write: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  restrictFilters: boolean;
  displayName: string;
  id: string;
  dashboardItems: TDashboardDetailsItem[];
  starred: boolean;
};

export type TDashboard = {
  displayName: string;
  id: string;
  starred: boolean;
  details: TDashboardDetails;
};

export type TDashboards = {
  dashboards: TDashboard[];
};
