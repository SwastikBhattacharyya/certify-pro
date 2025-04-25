import { Certificate } from "./_components/certificate";
import { CertificateForm } from "./_components/certificate-form";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex max-h-full w-full flex-col items-center overflow-y-scroll rounded-xl border border-transparent bg-white/30 p-4 md:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col items-center gap-y-4">
          <Certificate />
          <CertificateForm />
        </div>
      </div>
    </div>
  );
}
