import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/utils/cn";

export const PasswordInput = ({ className }: { className?: string }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className={cn("flex flex-col w-full relative", className)}>
      <Label>Password</Label>
      <div className="flex">
        <Input
          label="password"
          required
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          className="rounded-r-none"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(() => e.target.value);
          }}
        />
        <button
          type="button"
          className="px-2 border-[1px] border-l-0 rounded-r-md"
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
};
