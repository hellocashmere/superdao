import axios from "axios";

/**
 * Returns whether an unknown error is an HTTP 404 response from Axios.
 */
export function isNotFoundError(error: unknown) {
	return axios.isAxiosError(error) && error.response?.status === 404;
}
