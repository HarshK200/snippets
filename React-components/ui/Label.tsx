import { cn } from "@/utils/cn";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  label?: string;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      className={cn("whitespace-nowrap text-sm text-slate-700", className)}
      {...props}
    >
      {children}
    </label>
  );
};
