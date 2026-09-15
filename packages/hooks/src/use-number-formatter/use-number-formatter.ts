"use client";

import { useMemo } from "react";

export interface UseNumberFormatterOptions {
	/**
	 * Locale used to format numeric values.
	 */
	locale?: Intl.LocalesArgument;
}

export interface UseNumberFormatterReturn {
	/**
	 * Formats a value using compact notation, such as `1.2K`.
	 *
	 * @example `compact(1200)` returns `"1.2K"` for the `en` locale.
	 */
	compact: (value: number | bigint, options?: Intl.NumberFormatOptions) => string;

	/**
	 * Formats a value as an amount in the supplied currency.
	 *
	 * @example `currency(1200, "USD")` -> `"$1,200.00"`.
	 */
	currency: (value: number | bigint, currency: string, options?: Intl.NumberFormatOptions) => string;

	/**
	 * Formats a value with the locale's default number formatting.
	 *
	 * @example `number(1200)` -> `"1,200"`.
	 */
	number: (value: number | bigint, options?: Intl.NumberFormatOptions) => string;

	/**
	 * Formats a fractional value as a percentage.
	 *
	 * @example `percent(0.125)` -> `"12.5%"`.
	 */
	percent: (value: number | bigint, options?: Intl.NumberFormatOptions) => string;

	/**
	 * Formats a percentage-point value as a percentage.
	 *
	 * @example `percentValue(12.5)` -> `"12.5%"`.
	 */
	percentValue: (value: number | bigint, options?: Intl.NumberFormatOptions) => string;
}

/**
 * Provides locale-aware formatters for amounts, currencies, and percentages.
 */
export function useNumberFormatter({ locale = "en" }: UseNumberFormatterOptions = {}): UseNumberFormatterReturn {
	return useMemo(
		() => ({
			compact: (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
				new Intl.NumberFormat(locale, {
					maximumFractionDigits: 1,
					notation: "compact",
					...options,
				}).format(value),
			currency: (value: number | bigint, currency: string, options: Intl.NumberFormatOptions = {}) =>
				new Intl.NumberFormat(locale, { currency, style: "currency", ...options }).format(value),
			number: (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
				new Intl.NumberFormat(locale, options).format(value),
			percent: (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
				new Intl.NumberFormat(locale, {
					maximumFractionDigits: 1,
					style: "percent",
					...options,
				}).format(value),
			percentValue: (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
				new Intl.NumberFormat(locale, {
					maximumFractionDigits: 1,
					style: "percent",
					...options,
				}).format(typeof value === "bigint" ? Number(value) / 100 : value / 100),
		}),
		[locale]
	);
}
