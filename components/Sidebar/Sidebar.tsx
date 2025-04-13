import SidebarBrand from "./SidebarBrand";
import SidebarNav from "./SidebarNav";
//import SidebarWorkoutControls from "./SidebarWorkoutControls";
import SidebarUser from "./SidebarUser";
//import SidebarSearch from "./SidebarSearch";
//import SidebarSocials from "./SidebarSocials";
import SidebarWrapper from "./SidebarWrapper.client";

export default function Sidebar() {
  // Define guest user information
  const username = "Guest";
  const userImage = "/images/default-avatar.png"; // Replace with your default avatar path

  return (
    <SidebarWrapper>
      <SidebarBrand />
      <SidebarUser username={username} userImage={userImage} />
      {/* <SidebarSearch /> */}
      <SidebarNav />
      {/* <SidebarWorkoutControls /> */}
    </SidebarWrapper>
  );
}