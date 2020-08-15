export interface ISelectItem {
  label: string;
  value: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IStory {
  id: string;
  title: string;
  column: string;
  isDefect: boolean;
  description: string;
  points?: number;
  user?: string;
  isBlocked?: boolean;
  isReady?: boolean;
  blockReason?: string;
}

