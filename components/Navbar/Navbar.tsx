
import MobileNavbarClient from "./Navbar.client";

export default function MobileNavbar() {
  // Define guest user information
  const username = "Guest";
  const userImage = "/images/default-avatar.png"; // Replace with your default avatar path

  // Render the client component with guest user info
  return <MobileNavbarClient username={username} userImage={userImage} />;
}