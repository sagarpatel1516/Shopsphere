export const dynamic = "force-dynamic";

import AdminGuard from "@/components/auth/AdminGuard";

import AdminRealtimeProvider from "@/components/admin/AdminRealtimeProvider";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <AdminRealtimeProvider>{children}</AdminRealtimeProvider>
    </AdminGuard>
  );
}
