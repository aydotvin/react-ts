export interface RouterLinkProps {
  to: string;
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLElement>;
  [key: string]: any;
}
