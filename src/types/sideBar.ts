export interface SidebarProps {
  isLoggedIn: boolean;
  userName: string;
  loginInfo: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}
