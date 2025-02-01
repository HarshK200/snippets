interface tButton extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children, className }: tButton) => {
  return (
    <button
      className={`w-full bg-primary transition-all py-2 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
