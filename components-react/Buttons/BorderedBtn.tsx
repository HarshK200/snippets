export function MyButton() {
  return (
    <button
      className="px-5 py-1.5 border-[2px] border-primary rounded-lg transition-transform transition-colors hover:scale-105 hover:border-accent active:scale-100"
      onClick={() => {
        console.log("im a button")
      }}
    >
      Button
    </button>
  );
}

