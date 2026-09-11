<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project architecture

## Command execution

- Do not run linting, type-checking, build, test, formatting, Prettier, or similar validation and code-modifying commands unless the user explicitly approves the specific command first.
- This restriction applies even after making code changes. Report which commands could be run, and wait for the user's approval before running them.

This project uses Feature-Sliced Design (FSD) with Next.js App Router as the routing layer. Next.js conventions take precedence for routes and framework files.

## Layers and dependency direction

Use these application layers:

- `app`: Next.js routes and framework integration only.
- `widgets`: self-contained page sections and application layout blocks.
- `features`: user-facing actions and business use cases.
- `entities`: domain models and domain-specific UI.
- `shared`: application-wide UI compositions, utilities, API clients, configuration, and types that contain no business-domain knowledge.

Dependencies must point downward only:

```text
app -> widgets -> features -> entities -> shared
```

A layer may skip lower layers, but it must never import from a layer above it. Keep slices independent. Cross-slice imports must use the target slice's public API (`index.ts`); relative imports are allowed inside a slice.

Do not create an FSD `pages` layer. Routes, route groups, dynamic segments, layouts, loading states, error boundaries, and other routing concerns remain under the Next.js `app` directory.

## Recommended slice structure

Use only the segments a slice actually needs:

```text
<layer>/<slice>/
  ui/
  model/
  api/
  lib/
  config/
  index.ts
```

- `ui`: React components.
- `model`: state, schemas, and business rules.
- `api`: data access owned by the slice.
- `lib`: slice-specific helpers.
- `config`: slice-specific configuration.
- `index.ts`: the slice's explicit public API.

Use kebab-case for directories and source filenames. Do not create empty segments in advance.

The generic `<layer>/<slice>/ui` convention applies to entities, features,
shared slices, and reusable packages. Page-level widgets under `widgets/pages`
are intentionally flatter: their composition files and local `components`
live directly in the widget directory without an additional `ui` layer.

## Widget page structure

`widgets/pages` is an organizational directory for page-level compositions. It
is not a separate FSD layer. Route files remain under `app` and follow Next.js
conventions.

Mirror dynamic route segments in page widgets when this improves navigation
between `app` and `widgets`:

```text
app/(dashboard)/explore/labels/
  page.tsx
  [id]/
    page.tsx
    wallets/
      page.tsx
    insights/
      page.tsx

widgets/pages/explore/labels/
  root/
  [id]/
    wallets/
    insights/
```

Use the following conventions:

- `root` represents the static resource page.
- `[id]` represents a dynamic resource page.
- Child folders such as `wallets` and `insights` represent route-specific
  sections of the dynamic page.
- Keep `root` and `[id]` only inside `widgets/pages`; do not use them as
  replacements for Next.js route files.
- Do not create a `ui` directory inside page widgets.
- Do not use `blocks` inside page widgets.
- Use a local `components` directory for visual parts that belong only to the
  current page widget.
- Every page widget must have an explicit composition component at its root.
- A composition component is responsible for assembling the page or section;
  it must not be replaced by direct composition in `app/page.tsx`.
- Use descriptive composition files such as `labels.tsx`, `label.tsx`,
  `wallets.tsx`, and `insights.tsx`.
- Keep filenames local to their directory. Avoid repeating the full domain
  context in filenames: `components/header.tsx` is preferred over
  `components/label-id-header.tsx`.
- Keep exported React component names explicit: `LabelHeader`, `LabelWallets`,
  and `LabelInsights`.
- Keep simple components in one file.
- Create a nested component directory only when a component has multiple
  related files or independent responsibilities.
- Keep a data table in one `table.tsx` file by default. Extract a dialog into a
  separate file only when it owns independent state, behavior, or accessibility
  logic.
- Add `model`, `lib`, or `config` only when the page section has a real
  responsibility for them. Do not create empty or speculative directories.
- Expose each independently consumed page widget through its local `index.ts`.
- Route files in `app` may read `params`, select the route variant, and pass
  route data to a page widget. They must not contain page UI, data fetching,
  business rules, mock data, or multi-component page composition.

Example:

```text
widgets/pages/explore/labels/
  root/
    labels.tsx
    components/
      header.tsx
      group.tsx
      card.tsx
      skeleton.tsx
    index.ts

  [id]/
    label.tsx
    components/
      header.tsx
      tabs.tsx
      skeleton.tsx
    index.ts

    wallets/
      wallets.tsx
      components/
        highlights.tsx
        balance-chart.tsx
        table.tsx
        export-dialog.tsx
      model/
      lib/
      index.ts

    insights/
      insights.tsx
      components/
        metric-card.tsx
        bar-chart.tsx
        audience-overlap-table.tsx
      model/
      lib/
      index.ts
```

The composition hierarchy should be explicit:

```text
app route
  -> root/index.ts or [id]/index.ts
  -> labels.tsx or label.tsx
  -> wallets.tsx or insights.tsx
  -> local components
```

Page widgets may import downward from `features`, `entities`, and `shared`,
but must not import from `app`. Cross-widget imports should use the target
widget's public `index.ts`; prefer extracting genuinely reusable behavior into
a lower layer when multiple page widgets depend on it.

## Types and API contracts

- Place types that describe entities received from an API in the owning slice's `api/types/types.ts`.
- Place types consumed by widgets and components in the owning slice's `model/types/types.ts`.
- Keep API contracts and UI models separate. Convert API entities to model types at the slice boundary instead of leaking API-specific fields into UI code.
- Place Zustand and other slice state stores in `model/store.ts`.

## Code documentation

- Write all TSDoc comments in English.
- Always format TSDoc as a multiline block, even when it contains only one sentence. Never use a single-line comment such as `/** Accumulated data returned by an infinite query. */`.
- Add meaningful multiline TSDoc immediately above every named function declaration, including local handlers and icon components. `TODO: add docs` is not documentation.
- Keep the summary and supplementary information, such as an endpoint or documentation link, in separate paragraphs.

## State, callbacks, and forms

- Give every `useState` call an explicit generic argument. Use exact primitive or literal-union types, nullable unions for nullable state, explicit element types for arrays, the same explicit type for lazy initializers, and `ReturnType<typeof createStore>` for store factories without a named public type. Do not widen literal unions to `string` or use `any` or `unknown` merely to satisfy this rule.
- Use concise state-transition parameters: use `next` for a single next value and unprefixed domain names such as `period`, `range`, or `size` when a callback receives multiple values. Do not name function parameters `nextOpen`, `nextValue`, `nextPeriod`, or similar. Descriptive local variables such as `nextSearchParams` are allowed.
- Deprecated APIs are prohibited. Current migration examples are React's `SubmitEvent<HTMLFormElement>` in place of `FormEvent` and Zod's `z.email()` composed with `pipe` in place of chained `.email()`.
- Put form schemas, inferred value types, pure default factories, and pure normalization helpers in a colocated `model/form.ts`. Keep hooks, effects, event handlers, store access, and JSX in the UI component.

```ts
/**
 * API pagination parameters shared by list endpoints.
 */
export interface PaginationQuery {}

/**
 * Searches for users by nickname.
 *
 * Excludes the current user and deleted accounts.
 *
 * Documentation: [CybyAI](https://api.cyby.ai/docs#/user/search_users_user_search_get)
 */
export function useSearchUsers() {}
```

# Next.js page contract

Every `page.tsx` is a thin route entry point. A page may contain only:

- static `metadata` or `generateMetadata` for SEO;
- a short TSDoc comment that states the page's purpose;
- the default-exported Next.js page function;
- composition of one or more widgets through their public APIs.

Every main page must be assembled from widgets. Do not put data fetching, server actions, state, business rules, constants, mock data, mapping, formatting, or page UI implementation in `page.tsx`.

Route-level orchestration and data loading belong in a server widget. Domain data access and transformations should be delegated from that widget to the appropriate `feature`, `entity`, or `shared` API/model. Prefer Server Components by default and place `"use client"` at the smallest interactive boundary.

Next.js framework files such as `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` are framework adapters and do not use the reusable-component export contract when Next.js requires another signature or export style. Keep them thin as well.

# Component placement and installation

- Reusable design-system primitives and installed/generated UI components belong in `packages/ui`, not in route files or application FSD slices.
- Reusable icons belong in `packages/icons`.
- Product-specific compositions of primitives belong in the appropriate `widgets`, `features`, `entities`, or `shared` slice.
- `shared/ui` is for application-wide compositions that are not generic enough for `packages/ui` and contain no domain-specific behavior.
- Before installing a component, check whether an equivalent already exists in `packages/ui`.
- When installing or generating a component, target `packages/ui`, preserve the package's conventions, dependencies, styles, and exports, and expose the component through the package public API.
- Applications must consume package components through package exports. Do not deep-import package internals.
- Never copy installed component implementations into `page.tsx`.

# React component contract

Every reusable React component in `widgets`, `features`, `entities`, `shared`, and reusable packages must follow this contract:

1. Export a named `<ComponentName>Props` interface.
2. The interface must extend `ComponentPropsWithRef<"element">` for an intrinsic root, or `ComponentPropsWithRef<typeof BaseComponent>` when wrapping another component.
3. Export the component as a named function declaration.
4. Destructure `ref`, `className`, and the remaining props in the function signature when the component has a styled root element. `ref` must be first whenever it is present in an object-binding parameter.
5. Pass `ref` to the root element and spread the remaining props onto it.
6. Always place `{...props}` last among the root element attributes, after explicit props such as `ref`, `className`, state, variant, and data attributes, so callers cannot override those values accidentally.
7. Add a concise TSDoc comment immediately above the component function describing what it renders or does.

Canonical example:

```tsx
import type { ComponentPropsWithRef } from "react";

export interface FooterProps extends ComponentPropsWithRef<"footer"> {}

/**
 * Renders the site footer with navigation and payment information.
 */
export function Footer({ ref, className, ...props }: FooterProps) {
  return (
    <footer
      ref={ref}
      className={className}
      {...props}
    />
  );
}
```

Add component-specific properties to the exported interface while retaining the inherited ref-capable props. Do not use `React.FC`, anonymous component exports, default exports for reusable components, or a props `type` alias in place of the required interface. Next.js special files are exempt where the framework requires a default export.

Application code must not pass `className` to components imported from `@superdao/ui` or `@superdao/ui/components/*`. Prefer design-system defaults, semantic props or variants, or native wrappers for caller-owned layout. Reusable components must continue accepting and forwarding `className` at their own boundaries. The only permitted application use is exact `className={className}` forwarding to the rendered root UI primitive of a separately declared product composition when `className` is destructured unchanged from that composition's props. Literals, template expressions, `cn(...)`, renamed values, nested primitives, and ordinary call sites remain prohibited.

## Data attributes for variants and state

Expose every visual variant or component state on the component's root element through a descriptive `data-*` attribute. Style that value with Tailwind CSS data variants instead of selecting, mapping, or conditionally concatenating variant classes in JavaScript.

```tsx
export type ContainerSize = "default" | "sm";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  size?: ContainerSize;
}

/**
 * Constrains content to a responsive maximum width.
 */
export function Container({ ref, className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="container"
      data-size={size}
      className={cn("data-[size=default]:sm:max-w-[400px] data-[size=sm]:sm:max-w-80", className)}
    />
  );
}
```

- Use semantic names such as `data-size`, `data-variant`, `data-tone`, `data-orientation`, and `data-state`.
- Keep all possible Tailwind classes as complete static strings so Tailwind can discover them at build time.
- Do not use a JavaScript lookup table or conditional class expression when the same styling can be expressed through a `data-*` selector.
- Put exactly one stable `data-slot` on the rendered root of each separately declared component. Nested raw DOM or internal primitive nodes must not add another `data-slot`; another separately declared component may identify its own root.
- Do not use `data-page`.
- Preserve native semantic and accessibility attributes such as `disabled`, `aria-expanded`, and `aria-invalid`; styling data attributes do not replace them.
- When a UI primitive already emits a suitable state attribute, consume that attribute instead of duplicating the state.

## Commit and pull request titles

- Use `[workspace][area] Imperative description` for commit messages and pull request titles. Pull request titles must
  follow the same convention because squash merges use them as the resulting commit message.
- Use `[ui]`, `[web]`, `[lib]`, or `[config]` as the workspace label. Use `[code-infra]`, `[docs]`, `[internal]`,
  `[release]`, or `[test]` for repository-wide work that does not belong to a product workspace.
- Add a second label for a component or functional area when it makes the change easier to identify, such as
  `[ui][button]` or `[web][auth]`. Omit it when there is no clear area, and use additional area labels when a change
  intentionally spans closely related components.
- Write the description in English, start it with a capitalized imperative verb such as `Add`, `Fix`, `Remove`,
  `Improve`, `Support`, or `Deprecate`, and do not end it with a period.
- Do not add a colon after the labels. Describe the concrete result instead of using vague summaries such as
  `bug password` or `update component`.
- Keep workspace and infrastructure labels stable so release tooling can group entries and exclude `[docs]`, `[test]`,
  `[internal]`, and `[code-infra]` changes from user-facing changelogs by default.

Examples:

- `[ui][button] Add pointer cursor`
- `[web][auth] Display an error for invalid passwords`
- `[ui][dialog][popover] Share popup positioning logic`
- `[code-infra] Add changelog generation`
