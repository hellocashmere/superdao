/**
 * Normalized response returned by the shared API client.
 */
export interface APIResponse<T> {
  /**
   * Payload returned by the requested endpoint.
   */
  data: T;
}
