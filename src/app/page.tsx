import { Certificate } from "./_components/certificate";
import { CertificateForm } from "./_components/certificate-form";
import { Sidebar } from "./_components/sidebar";
import { SidebarButton } from "./_components/sidebar-button";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:px-12">
      <aside>
        <Sidebar />
        <SidebarButton />
      </aside>
      <div className="flex max-h-full w-full flex-col items-center rounded-xl border border-transparent bg-white/30 py-4 md:w-2/3 lg:w-1/2">
        <main className="flex w-full flex-col items-center gap-y-4 overflow-y-scroll px-4">
          <Certificate />
          <CertificateForm />
        </main>
      </div>
    </div>
  );
}
