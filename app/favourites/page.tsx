// import NextJsCarousel from "../components/CardCarousell";
// "use client";
// import Carousel from "../components/CardCarousell";
// import Footer from "../components/Footer";
// import { usePathname } from "next/navigation";

// const images = [
//   "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
//   "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// ];

// export default function Favourites() {
//   const pathname = usePathname();
//   return (
//     <>
//       <p>This is the Favourites page</p>
//       {/* <Carousel images={images} />
//       <Footer pathnameUrl={pathname} /> */}
//     </>
//   );
// }

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

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const minDayRangeLength = 28;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  // React.useEffect(() => {
  //   return () => {
  //     setDate(undefined);
  //   };
  // }, []);

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
              "w-[300px] justify-start text-left font-normal",
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
