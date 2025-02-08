import { cn } from "@/lib/utils";

import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";

export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex min-h-8 mt-16 items-center justify-center">
      <div
        className={cn(
          "group rounded-full text-white border border-neutral-800 bg-neutral-900 text-base  transition-all ease-in hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex text-neutral-200 items-center justify-center px-4 py-1 transition ease-out">
          <span>✨ Introducing Magic UI</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
}
