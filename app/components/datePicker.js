"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({handleParentDate, defaultDate, isBirthDate, isReadOnly }) {
  const [date, setDate] = useState(defaultDate);
  
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
          {date ? format(date, "yyy-MM-dd", { timeZone: "CET" }) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {isReadOnly ?  <Calendar
            mode="single"
            selected={date}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1940}
            toYear={2024}
          /> : isBirthDate ? (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              handleParentDate(date);
              setDate(date);
            }}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1940}
            toYear={2024}
          />
        ) : (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              handleParentDate(date);
              setDate(date);
            }}
            initialFocus
            // defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
            fromMonth={
              new Date(new Date().getFullYear(), new Date().getMonth())
            }
            toDate={new Date(2026, 9, 11)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
