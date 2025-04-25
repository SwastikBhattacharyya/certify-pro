import { cn } from "@/lib/cn";

type InputProps = React.ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "rounded-lg border border-gray-400 px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out outline-none focus:border-white",
        className,
      )}
      {...props}
    />
  );
}
