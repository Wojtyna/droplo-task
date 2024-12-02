type NavItemProps = Omit<AllNavItemProps, "children" | "id">;

export interface NavStateProps {
  isLoaded: boolean;
  items: AllNavItemProps[];

  addItem: (data: NavItemProps, parentId?: string) => void;
  updateItem: (
    data: Partial<NavItemProps>,
    id: string,
    parentId?: string
  ) => void;
  deleteItem: (id: string, parentId?: string) => void;
  setLoaded: () => void;
}

export interface AllNavItemProps {
  id: string;
  title: string;
  url: string;
  children?: AllNavItemProps[];
}
