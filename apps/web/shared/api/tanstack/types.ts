/**
 * Controls whether a TanStack Query request may run.
 *
 * Extend this contract when application-wide query execution options are needed.
 */
export interface QueryOptions {
	enabled?: boolean;
}
