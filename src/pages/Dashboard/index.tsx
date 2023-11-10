import { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { getDashboards } from "./api";
import { getFavorites, addFavorite, removeFavorite } from "./favorites";
import { formatText } from "@/lib/utils";
import Loading from "./Loading";

import { TDashboard, TDashboardDetailsItem } from "./types";

import {
  IconStar16,
  IconStarFilled16,
  IconTextBox16,
  IconVisualizationColumn16,
  IconWorld16,
} from "@dhis2/ui-icons";

const DashboardItemIcon = ({ item }: { item: TDashboardDetailsItem }) => {
  return (
    <span className="text-slate-500">
      {item?.type === "TEXT" && <IconTextBox16 />}
      {item?.type === "MAP" && <IconWorld16 />}
      {item?.type === "VISUALIZATION" && <IconVisualizationColumn16 />}
    </span>
  );
};

const stripDashboardTitle = (title: string): string => {
  if (!title || !title.includes(": ")) return title;
  return title.split(": ")[1];
};

const DashboardItemTitle = ({ item }: { item: TDashboardDetailsItem }) => {
  if (item?.type === "TEXT") {
    // Only use this function for sanitized text
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: formatText(item?.text),
        }}
      />
    );
  }

  return (
    <span>
      {stripDashboardTitle(
        item?.[item?.type?.toLocaleLowerCase() as keyof TDashboardDetailsItem]
          ?.name
      )}
    </span>
  );
};

export default function Dashboard() {
  const { status, data } = useQuery("todos", getDashboards);
  const [dashboards, setDashboards] = useState<TDashboard[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      const favorites = getFavorites();
      const dashboards = data?.dashboards?.map((dashboard: TDashboard) => {
        return {
          ...dashboard,
          starred: favorites?.includes(dashboard?.id),
        };
      });
      setDashboards(dashboards);
    }
  }, [data]);

  const handleFilterChange = useCallback(
    (value: string) => setFilter(value),
    []
  );

  const onToggleFavorite = useCallback(
    (id: string) => {
      const favorites = getFavorites();
      if (favorites?.includes(id)) {
        removeFavorite(id);
        toast({
          title: "Removed from favorites",
          description: "Add it back by clicking the star icon",
          action: <ToastAction altText="Try again">Ok</ToastAction>,
          variant: "default", // default | destructive
        });
      } else {
        addFavorite(id);
        toast({
          title: "Added to favorites",
          description: "Remove it by clicking the star icon",
          action: <ToastAction altText="Try again">Ok</ToastAction>,
          variant: "default",
        });
      }
      const updatedDashboards = dashboards?.map((dashboard: TDashboard) => {
        if (dashboard?.id === id) {
          return {
            ...dashboard,
            starred: !dashboard?.starred,
          };
        }
        return dashboard;
      });
      setDashboards(updatedDashboards);
    },
    [dashboards, toast]
  );

  return (
    <>
      <main className="w-full my-4">
        <div className="max-w-xl mx-auto">
          <header className="w-full py-2 mb-4 border-b border-slate-300 flex items-center justify-between">
            <h1 className="font-medium text-base">HDSI2 Dashboard</h1>
            <Select
              onValueChange={handleFilterChange}
              value={filter}
              name="filter-dashboards-dropdown">
              <SelectTrigger className="w-52 text-sm">
                <span className="text-slate-400">Filter items</span>
                <SelectValue
                  placeholder="Filter items"
                  className="text-left flex-grow"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem id="all-dashboards" value="all">
                  All types
                </SelectItem>
                <SelectItem id="visualization-dashboards" value="visualization">
                  Visualization
                </SelectItem>
                <SelectItem id="map-dashboards" value="map">
                  Map
                </SelectItem>
                <SelectItem id="text-dashboards" value="text">
                  Text
                </SelectItem>
              </SelectContent>
            </Select>
          </header>
          <section className="w-full">
            {status === "loading" ? (
              <Loading />
            ) : (
              <Accordion
                type="single"
                collapsible={true}
                defaultValue={data?.dashboards?.[0]?.id}
                id="dashboards-list"
                className="w-full space-y-2">
                {dashboards?.map((dashboard: TDashboard) => {
                  return (
                    <AccordionItem
                      value={dashboard?.id}
                      key={`dashboard-${dashboard?.id}`}
                      className="rounded-md shadow w-full bg-white relative">
                      <AccordionTrigger className="text-base font-medium flex items-center justify-between gap-2 px-4 py-2 w-full">
                        {dashboard?.displayName}
                        <div className="flex items-center justify-end gap-2 text-slate-600 absolute right-10">
                          <span
                            className="cursor-pointer dashboard-favorite-toggle"
                            data-is-starred={dashboard?.starred}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(dashboard?.id);
                            }}>
                            {dashboard?.starred ? (
                              <IconStarFilled16 />
                            ) : (
                              <IconStar16 />
                            )}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        {dashboard?.details?.dashboardItems?.length > 0 && (
                          <ul className="space-y-2 divide-y divide-slate-200">
                            {dashboard?.details?.dashboardItems
                              ?.filter(
                                (i) =>
                                  filter === "all" ||
                                  i.type?.toLocaleLowerCase() === filter
                              )
                              ?.map((item: TDashboardDetailsItem) => {
                                if (item.type === "MESSAGES") return;
                                return (
                                  <li
                                    key={`dashboard-item-${item.id}`}
                                    className="flex items-start justify-start gap-1 text-slate-700 text-sm pt-2">
                                    <DashboardItemIcon item={item} />
                                    <DashboardItemTitle item={item} />
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
