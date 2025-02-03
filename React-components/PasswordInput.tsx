import { Input } from "./ui/Input"; // <------ NOTE: this is the input component from ui/input directory
import { Eye, EyeOff } from "lucide-react"; // <------- Requires lucide-react installed

export default function PasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="text-sm text-slate-700">
        Password
      </label>
      <div className="flex">
        <Input
          required
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          className="rounded-r-none"
          value={formDetails?.password || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormDeatils((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <button
          type="button"
          className="px-2 border border-l-0 rounded-md rounded-l-none"
          onClick={() => {
            setIsPasswordVisible((prev) => {
              return !prev;
            });
          }}
        >
          {isPasswordVisible ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
}
