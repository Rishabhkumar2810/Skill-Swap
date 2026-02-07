import SidebarLayout from "../components/SidebarLayout";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
}

export default DashboardLayout;
