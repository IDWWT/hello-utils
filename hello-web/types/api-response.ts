export type CursorBasedList<T = unknown> = {
  totalCount: number;
  edges: EdgeNode<T>[];
  pageCursors: PageCursors;
}

export type EdgeNode<T = unknown> = {
  node: T
}

export type PageCursors = {
  around: Cursor[];
  first: Cursor | null;
  last: Cursor | null;
  next: Cursor | null;
  previous: Cursor | null;
}

export type Cursor = {
  cursor: string;
  isCurrent: boolean;
  page: number;
}