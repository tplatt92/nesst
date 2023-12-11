import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger>Filter</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="p-4">
        Test
        </div>
      </SheetContent>
    </Sheet>
  );
}
