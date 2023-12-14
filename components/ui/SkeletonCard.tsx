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
      <CardHeader className="relative lg:h-40">
        <Skeleton className="h-full w-full" />
      </CardHeader>
      <CardContent>
        <CardTitle>
          <Skeleton className="h-4 w-1/2" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-1/4" />
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>
          <Skeleton className="h-4 w-1/4" />
        </CardDescription>
        <CardDescription>
          <Skeleton className="h-4 w-1/4" />
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
