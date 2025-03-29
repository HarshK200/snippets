import { cn } from "@/utils/cn";

interface CheckBoxProps extends React.HTMLProps<HTMLInputElement> {}

export const CheckBox = ({ type, className, ...props }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      className={cn("cursor-pointer size-4 shadow-sm accent-black", className)}
      {...props}
    />
  );
};
