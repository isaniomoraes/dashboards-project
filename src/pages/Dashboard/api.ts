import { DASHBOARDS_API } from "../../constants/api";

import {
  TDashboards,
  TDashboard,
  TDashboardDetails,
} from "./types";

export async function getDashboardDetails(
  dashboardId: string
): Promise<TDashboardDetails> {
  const url = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboardId}.json`;

  try {
    const res = await fetch(url);

    if (!res?.ok) {
      throw new Error(
        `Failed to fetch dashboard details for dashboard ID: ${dashboardId}`
      );
    }

    return res?.json();
  } catch (error) {
    console.error(`Error fetching dashboard details: ${error}`);
    throw error;
  }
}

export async function getDashboards(): Promise<TDashboards> {
  const res = await fetch(DASHBOARDS_API);
  const { dashboards } = await res.json();

  // Fetch details for each dashboard
  const dashboardDetailsPromises: Promise<TDashboardDetails>[] = dashboards.map(
    (dashboard: TDashboard) => getDashboardDetails(dashboard.id)
  );

  // Wait for all details to be fetched
  const dashboardDetails: TDashboardDetails[] = await Promise.all(
    dashboardDetailsPromises
  );

  // Combine dashboard details with the original dashboards
  const dashboardsWithDetails: TDashboards = {
    dashboards: dashboards.map((dashboard: TDashboard, index: number) => ({
      ...dashboard,
      details: dashboardDetails[index],
    })),
  };
  return dashboardsWithDetails;
}
