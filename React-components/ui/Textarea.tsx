export function Textarea({
  required,
  id,
  name,
  placeholder,
  className,
  value,
  onChange,
}: React.HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      required={required}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" ${className}`}
    />
  );
}

