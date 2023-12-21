// FilterSheet.tsx
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { FilterSheetProps } from "@/types/types";

const FilterSheet: React.FC<FilterSheetProps> = ({
  onSubmit,
  onReset,
  onPriceRangeChange,
  onBedRangeChange,
  onBathRangeChange,
  bedRange,
  priceRange,
  bathRange,
  smokeAlarm,
  onSmokeAlarmChange,
  pets,
  onPetsChange,
  pool,
  onPoolChange,
  wifi,
  onWifiChange,
  parking,
  onParkingChange,
  kitchen,
  onKitchenChange,
  aircon,
  onAirconChange,
  tv,
  onTvChange,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="shadow-lg md:w-14 lg:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
          fill="#39393a"
          className="border shadow h-10 w-10 p-2 rounded-full text-nesstDarkGrey"
        >
          <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
        </svg>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetTitle className="pb-8">Filters</SheetTitle>
        <form onSubmit={onSubmit} className="flex flex-col">
          <label className="pb-2">Price</label>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={2000}
            step={100}
            minStepsBetweenThumbs={1}
            value={priceRange}
            onValueChange={onPriceRangeChange}
            formatLabel={(value: number) => `£${value}`}
          />
          <label className="pb-2">Bedrooms</label>
          <Slider
            defaultValue={bedRange}
            min={0}
            max={10}
            step={1}
            minStepsBetweenThumbs={1}
            value={bedRange}
            onValueChange={onBedRangeChange}
            formatLabel={(value: number) => `${value}`}
          />
          <label className="pb-2">Bathrooms</label>
          <Slider
            defaultValue={bathRange}
            min={0}
            max={10}
            step={1}
            minStepsBetweenThumbs={1}
            value={bathRange}
            onValueChange={onBathRangeChange}
            formatLabel={(value: number) => `${value}`}
          />
          <div className="flex flex-col pt-4 gap-4">
            <h2 className="font-bold text-lg">Amenities</h2>
            <div className="flex flex-row items-center justify-between">
              <label>Smokealarm</label>
              <Switch
                checked={smokeAlarm}
                onCheckedChange={onSmokeAlarmChange}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Pets</label>
              <Switch checked={pets} onCheckedChange={onPetsChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Pool</label>
              <Switch checked={pool} onCheckedChange={onPoolChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Wifi</label>
              <Switch checked={wifi} onCheckedChange={onWifiChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Parking</label>
              <Switch checked={parking} onCheckedChange={onParkingChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Kitchen</label>
              <Switch checked={kitchen} onCheckedChange={onKitchenChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>Aircon</label>
              <Switch checked={aircon} onCheckedChange={onAirconChange} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label>TV</label>
              <Switch checked={tv} onCheckedChange={onTvChange} />
            </div>
          </div>

          <SheetClose asChild>
            <button
              className="bg-nesstDarkGrey font-bold w-full mt-12 md:mt-4 lg:mt-12 py-2 rounded-full text-white"
              type="submit"
            >
              Apply
            </button>
          </SheetClose>
        </form>

        <button
          className="text-sm mt-4 text-center w-full"
          type="reset"
          onClick={onReset}
        >
          Reset
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
