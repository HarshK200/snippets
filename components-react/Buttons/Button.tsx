export function MyButton() {
  return (
    <button
      className="px-5 py-1.5 m-[2px] hover:m-0 bg-primary text-white hover:text-black hover:bg-slate-100 rounded-lg transition-transform transition-colors hover:scale-105 hover:border-[2px] hover:border-accent active:scale-100"
      onClick={() => {
        console.log("i'm a button");
      }}
    >
      Button
    </button>
  );
}
