import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
      <Loader2 className="animate-spin w-8 h-8 mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
