const Input = ({
  required,
  id,
  name,
  placeholder,
  type,
  className,
  value,
  onChange,
}: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      required={required}
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
    />
  );
};

export { Input };
