import React from "react";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
      data-testid="card-id"
    >
      {"abcdefghijk".split(" ").map((i) => (
        <SkeletonCard data-testid="card-id" key={i} />
      ))}
    </div>
  );
}
