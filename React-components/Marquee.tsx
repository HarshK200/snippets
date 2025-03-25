/*Css for Marquee*/
@theme {
  --animate-scroll-left: scroll 20s linear infinite;

  @keyframes scroll {
    to {
      transform: translate(-50%);
    }
  }
}

/*The cn function*/
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}


/* The Marquee component*/
import { cn } from "@/utils/cn";

export const Marquee = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        WebkitMask: "linear-gradient(90deg, transparent, white)",
        mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <div className={cn("w-fit flex bg-white animate-scroll-left", className)}>
        {children}
        {children}
      </div>
    </div>
  );
};

export const MarqueeChild = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  return (
    <div className={cn("flex items-center shrink-0 size-28 mx-10", className)}>
      {children}
    </div>
  );
};
