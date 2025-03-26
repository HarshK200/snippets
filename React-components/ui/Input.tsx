import { cn } from "@/utils/cn";

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input = ({ label, id, className, ...props }: InputProps) => {
  return (
    <input
      id={id}
      className={cn(
        "w-full h-fit text-sm rounded-md shadow-xs px-3 py-1.5 border-[1px] border-gray-300 focus:border-gray-400 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};
