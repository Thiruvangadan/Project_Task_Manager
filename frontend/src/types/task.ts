export interface Task {
  id: string;
  title: string;
  completed: boolean;
  due_date?: string | null;
}
