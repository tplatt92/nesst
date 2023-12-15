import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader className="relative md:h-40">
        <Skeleton className="h-full w-full" />
      </CardHeader>
      <CardContent>
        <CardTitle>
          <Skeleton className="h-2 w-1/2 my-2" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-2 w-1/4" />
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between my-2">
        <Skeleton className="h-2 w-1/4" />

        <Skeleton className="h-2 w-1/4" />

        <Skeleton className="h-2 w-1/4" />
      </CardFooter>
    </Card>
  );
}
