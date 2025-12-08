import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-full mx-auto space-y-6">
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
}
