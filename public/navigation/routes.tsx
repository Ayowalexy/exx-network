import { screensType } from "../context/navigation";

type menu = {
  title: string;
  route: string;
};

type routeType = {
  title: screensType;
  hasSubMenu: boolean;
  icon: string;
  subMenu?: menu[];
  route?: string;
};

export const routes: routeType[] = [
  {
    title: "Home",
    icon: './images/svgs/sidebar-icons/home.svg',
    hasSubMenu: false,
    route: "home",
  },
  {
    title: "Dashboard",
    icon: './images/svgs/sidebar-icons/dashboard.svg',
    hasSubMenu: true,
    subMenu: [
      {
        title: "Sender",
        route: "sender",
      },
      {
        title: "Notifications",
        route: "notifications",
      },
      {
        title: "Analytics",
        route: "analytics",
      },
      {
        title: "Reports",
        route: "reports",
      },
    ],
  },
  {
    title: "Projects",
    icon: './images/svgs/sidebar-icons/projects.svg',
    hasSubMenu: false,
    route: "projects",
  },
  {
    title: "Tasks",
    icon: './images/svgs/sidebar-icons/task.svg',
    hasSubMenu: true,
    subMenu: [
      {
        title: "To do",
        route: "to-do",
      },
      {
        title: "Updates",
        route: "updates",
      },
    ],
  },
  {
    title: "Reports",
    icon: './images/svgs/sidebar-icons/reporting.svg',
    hasSubMenu: false,
    route: "reports",
  },
  {
    title: "Users",
    icon: './images/svgs/sidebar-icons/user.svg',
    hasSubMenu: false,
    route: "users",
  },
  {
    title: "Supports",
    icon: './images/svgs/sidebar-icons/support.svg',
    hasSubMenu: false,
    route: "supports",
  },
  {
    title: "Settings",
    icon: './images/svgs/sidebar-icons/settings.svg',
    hasSubMenu: false,
    route: "settings",
  },
];
