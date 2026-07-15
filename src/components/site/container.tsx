import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Container = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  function Container({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
          className,
        )}
        {...props}
      />
    );
  },
);
