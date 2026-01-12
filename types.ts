import { LucideIcon } from "lucide-react";

declare global {
  interface Window {
    dashboard: any; // Declare the global dashboard object
  }
}

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon?: LucideIcon;
  isDashboard?: boolean;
  children?: MenuItem[];
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  isFeatured?: boolean;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  isIncrease?: boolean;
  colorClass: string;
  icon?: LucideIcon;
}

export enum FilterTimeRange {
  TODAY = "Hôm nay",
  WEEK = "Tuần này",
  MONTH = "Tháng này"
}