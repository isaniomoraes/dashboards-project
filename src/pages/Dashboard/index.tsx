import { DASHBOARDS_API } from "../../constants/api";
import { useQuery } from "react-query";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { formatText } from "@/lib/utils";

import {
  TDashboards,
  TDashboard,
  TDashboardDetails,
  TDashboardDetailsItem,
} from "./types";

// @ts-ignore
import {
  IconChevronDown24,
  IconStar16,
  IconStarFilled16,
  IconTextBox16,
  IconVisualizationColumn16,
  IconWorld16,
} from "@dhis2/ui-icons";

async function getDashboardDetails(
  dashboardId: string
): Promise<TDashboardDetails> {
  const url = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboardId}.json`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch dashboard details for dashboard ID: ${dashboardId}`
      );
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching dashboard details: ${error}`);
    throw error;
  }
}

async function getDashboards(): Promise<TDashboards> {
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

const stripDashboardTitle = (title: string): string => {
  if (!title || !title.includes(": ")) return title;
  return title.split(": ")[1];
};

export default function Dashboard() {
  const { status, data } = useQuery("todos", getDashboards);
  console.log(data);

  return (
    <>
      <main className="w-full my-4">
        <div className="max-w-xl mx-auto">
          <header className="w-full py-2 mb-4 border-b border-slate-300 flex items-center justify-between">
            <h1 className="font-medium text-base">HDSI2 Dashboard</h1>
          </header>
          <section className="w-full">
            {status === "loading" ? (
              <div className="w-full space-y-2">
                <div className="w-full h-8 rounded bg-slate-100 animate-pulse"></div>
                <div className="w-full h-8 rounded bg-slate-100 animate-pulse"></div>
                <div className="w-full h-8 rounded bg-slate-100 animate-pulse"></div>
                <div className="w-full h-8 rounded bg-slate-100 animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-2 w-full">
                {data?.dashboards?.map((dashboard: TDashboard) => {
                  return (
                    <Collapsible
                      key={`dashboard-${dashboard?.id}`}
                      className="rounded-md shadow w-full bg-white">
                      <CollapsibleTrigger className="text-base font-medium flex items-center justify-between gap-2 px-4 py-2 w-full">
                        {dashboard?.displayName}
                        <div className="flex items-center justify-end gap-2 text-slate-600">
                          {dashboard?.starred ? (
                            <IconStarFilled16 />
                          ) : (
                            <IconStar16 />
                          )}
                          <IconChevronDown24 />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4 pt-0">
                        <ul className="space-y-2 divide-y divide-slate-200">
                          {dashboard?.details?.dashboardItems?.map(
                            (item: TDashboardDetailsItem) => {
                              return (
                                <li
                                  key={`dashboard-item-${item.id}`}
                                  className="flex items-start justify-start gap-1 text-slate-700 text-sm pt-2">
                                  <>
                                    <span className="text-slate-500">
                                      {item?.type === "TEXT" && (
                                        <IconTextBox16 />
                                      )}
                                      {item?.type === "MAP" && <IconWorld16 />}
                                      {item?.type === "VISUALIZATION" && (
                                        <IconVisualizationColumn16 />
                                      )}
                                    </span>
                                    <span>
                                      {item?.type === "TEXT" ? (
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: formatText(item?.text),
                                          }}
                                        />
                                      ) : (
                                        stripDashboardTitle(
                                          item?.[
                                            item?.type?.toLocaleLowerCase() as keyof TDashboardDetailsItem
                                          ]?.name
                                        )
                                      )}
                                    </span>
                                  </>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
