type ParentData = Omit<NavItemProps, "children" | "id">;

export interface NavStateProps {
  isLoaded: boolean;
  items: NavItemProps[];
  count: number | null;

  addItem: (data: ParentData, parentId?: string) => void;
  updateItem: (
    data: Partial<ParentData>,
    id: string,
    parentId?: string
  ) => void;
  deleteItem: (id: string, parentId?: string) => void;
}

export interface NavItemProps {
  id: string;
  title: string;
  url: string;
  children?: NavItemProps[];
}
