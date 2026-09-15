import { success } from "../../../../shared/api/response";

/**
 * Reports whether the API process is ready to serve requests.
 */
export function GET(): Response {
	return success({ status: "ok" });
}
