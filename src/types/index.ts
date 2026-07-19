// Component Props Types
export interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export interface HorizontalContentBlockProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export interface TitleBlockProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface SuperBlockProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  logo?: string;
  navigation?: NavigationItem[];
  className?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Content Types
export interface ContentBlock {
  id: string;
  type: 'horizontal' | 'title' | 'super';
  data: unknown;
}

export interface HorizontalBlockData {
  image: string;
  imageAlt: string;
  title: string;
  content: string;
}

export interface TitleBlockData {
  title: string;
  subtitle?: string;
}
