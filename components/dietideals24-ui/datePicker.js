import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn-ui/button";
import { Calendar } from "@/components/shadcn-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";

export default function DatePicker({
  handleParentDate,
  defaultDate,
  isBirthDate,
  isReadOnly,
}) {
  const [date, setDate] = useState(
    defaultDate
      ? new Date(
          defaultDate.getTime() + defaultDate.getTimezoneOffset() * 60000
        )
      : null
  );

  const toLocalDate = (utcDate) => {
    if (!utcDate) return null;
    const localDate = new Date(
      utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
    );
    return localDate;
  };

  const localDate = toLocalDate(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(localDate, "yyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {isReadOnly ? (
          <Calendar
            mode="single"
            selected={toLocalDate(date)}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1940}
            toYear={2024}
          />
        ) : isBirthDate ? (
          <Calendar
            mode="single"
            selected={toLocalDate(date)}
            onSelect={(selectedDate) => {
              const localDate = toLocalDate(selectedDate);
              handleParentDate(localDate);
              setDate(localDate);
            }}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1940}
            toDate={Date.now()}
          />
        ) : (
          <Calendar
            mode="single"
            selected={toLocalDate(date)}
            onSelect={(selectedDate) => {
              const localDate = toLocalDate(selectedDate);
              handleParentDate(localDate);
              setDate(localDate);
            }}
            initialFocus
            fromDate={new Date()}
            toDate={new Date(2026, 9, 11)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
