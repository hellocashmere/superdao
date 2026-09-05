"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetLabels } from "@/entities/label";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { LabelGroup } from "./components/group";
import { LabelsHeader } from "./components/header";

export interface ExploreLabelsPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the label discovery page.
 */
export function ExploreLabelsPage({ className, ref, ...props }: ExploreLabelsPageProps) {
  const labelsQuery = useGetLabels();

  if (labelsQuery.error) throw labelsQuery.error;

  if (labelsQuery.isPending) {
    return (
      <Container
        {...props}
        ref={ref}
        aria-busy="true"
        data-page="explore-labels"
        data-state="loading"
        className={cn("flex min-h-0 flex-1 flex-col", className)}
      >
        <PageHeader className="min-h-18">
          <Skeleton className="h-7 w-20" />
        </PageHeader>
        <PageBody className="pt-4">
          {[4, 16].map((itemCount, groupIndex) => (
            <section
              key={itemCount}
              className="mb-10"
            >
              <Skeleton className={cn("h-5.25", groupIndex === 0 ? "w-20" : "w-18")} />
              <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: itemCount }, (_, index) => (
                  <div
                    key={index}
                    className="flex h-16 items-center gap-4"
                  >
                    <Skeleton className="size-16 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-5.25 w-3/4 max-w-32" />
                      <Skeleton className="h-5 w-14" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </PageBody>
      </Container>
    );
  }

  const interests = labelsQuery.data.filter(({ category }) => category === "interest");
  const personas = labelsQuery.data.filter(({ category }) => category === "persona");

  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-labels"
      data-state="ready"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <LabelsHeader />
      <PageBody className="pt-4">
        <LabelGroup
          title="Interests"
          items={interests}
        />
        <LabelGroup
          title="Personas"
          items={personas}
        />
      </PageBody>
    </Container>
  );
}
