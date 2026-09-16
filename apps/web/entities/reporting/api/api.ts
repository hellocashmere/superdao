import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { ReportingDTOToView } from "../lib/to-map";
import type { ReportingView } from "../model/types/types";

import type { ReportingDTO, SidebarReportDTO } from "./types/types";

/**
 * Loads a complete reporting account by its backend-provided ID.
 *
 * Endpoint: `GET /reports/:id`.
 */
export function useGetReporting(id: number): UseQueryResult<ReportingView, Error> {
	return useQuery<APIResponse<ReportingDTO>, Error, ReportingView>({
		queryKey: ["reporting", "by-id", id],
		queryFn: () => {
			return baseQuery<ReportingDTO>(`/reports/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return ReportingDTOToView(response.data);
		},
	});
}

/**
 * Loads reports displayed in the application sidebar.
 */
export function useGetSidebarReports() {
	return useQuery<APIResponse<readonly SidebarReportDTO[]>>({
		queryKey: ["reports", "sidebar"],
		queryFn: () => {
			return baseQuery<readonly SidebarReportDTO[]>("/reports", {
				method: "GET",
			});
		},
	});
}
