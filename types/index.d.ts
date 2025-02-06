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

export type ContentConfig = {
  mainNav: NavItem[];
};

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  isLogin: boolean;
}

export interface UserState {
  user: UserType | null;
}
