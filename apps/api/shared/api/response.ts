/**
 * Serializes successful API data using the shared response envelope.
 */
export function success(data: object | readonly object[], metadata?: object): Response {
	return Response.json(
		metadata === undefined
			? {
					data: data,
				}
			: {
					data: data,
					metadata: metadata,
				}
	);
}

/**
 * Serializes an API error using the shared error envelope.
 */
export function failure(status: number, code: string, message: string): Response {
	return Response.json(
		{
			error: {
				code: code,
				message: message,
			},
		},
		{
			status: status,
		}
	);
}
