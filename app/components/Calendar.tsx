//combining shadcn components to create a calendar widget [open and closed state]
"use client";
import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function CalendarWidget({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const minDayRangeLength = 28;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(Date.now(), 28),
  });

  const handleSelectDateRange = (selectedDate: DateRange | undefined) => {
    if (
      selectedDate &&
      selectedDate.from &&
      selectedDate.to &&
      differenceInDays(selectedDate.to, selectedDate.from) >= minDayRangeLength
    ) {
      setDate(selectedDate);
    } else {
      alert("Selected date range must be at least one month");
    }
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              " justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y, dd, LLL")} -{" "}
                  {format(date.to, "y, dd, LLL")}
                </>
              ) : (
                format(date.from, "y, dd, LLL")
              )
            ) : (
              <span>Pick your length of stay</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
