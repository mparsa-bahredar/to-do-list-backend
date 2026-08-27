export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  attachmentPath: string | null;
}