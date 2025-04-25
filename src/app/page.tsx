import { Certificate } from "./_components/certificate";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex max-h-full w-full flex-col items-center overflow-scroll rounded-xl border border-transparent bg-white/30 p-4 md:w-2/3 lg:w-1/2">
        <div className="w-full">
          <Certificate />
        </div>
      </div>
    </div>
  );
}
