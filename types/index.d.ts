export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    confess: string;
    x: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type HeaderContentConfig = {
  mainNav: NavItem[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  isLogin: boolean;
};
