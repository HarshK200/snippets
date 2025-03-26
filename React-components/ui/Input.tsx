import { cn } from "@/utils/cn";

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input = ({ label, id, className, ...props }: InputProps) => {
  return (
    <input
      id={id}
      className={cn(
        "w-full h-fit rounded-md px-3 py-1 border-[1px] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};
