export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

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

export type MarketingConfig = {
  mainNav: NavItem[];
};
