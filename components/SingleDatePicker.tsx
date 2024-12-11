"use client";

import * as React from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SingleDatePickerProps {
  className?: string;
  date: Date;
  onDateChange: (date: Date) => void;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  daysToAdd?: number;
}

export function SingleDatePicker({
  className,
  date,
  onDateChange,
  disabled = false,
  fromDate,
  toDate,
  daysToAdd,
}: SingleDatePickerProps) {
  const endDate = daysToAdd ? addDays(date, daysToAdd) : toDate || date;
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={disabled}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              daysToAdd || toDate ? (
                <>
                  {format(date, "LLL dd, y")} - {format(endDate, "LLL dd, y")}
                </>
              ) : (
                format(date, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {daysToAdd && daysToAdd > 0 && (
            <div className="w-[250px] px-3 py-2 text-sm text-muted-foreground border-b text-wrap">
              Selecting a date will automatically include the next {daysToAdd}{" "}
              day{daysToAdd > 1 ? "s" : ""}
            </div>
          )}
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(date) => {
              if (date) {
                onDateChange(date);
                setOpen(false);
              }
            }}
            numberOfMonths={1}
            fromDate={fromDate}
            toDate={toDate}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
