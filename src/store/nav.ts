import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

import { AllNavItemProps, NavStateProps } from "@/types";

const useNavStore = create<NavStateProps>()(
  persist(
    (set) => ({
      isLoaded: false,
      items: [],

      addItem: (data, parentId) =>
        set((state) => {
          const newItem: AllNavItemProps = {
            ...data,
            id: uuidv4(),
            children: [],
          };
          const addChild = (nodes: AllNavItemProps[]): AllNavItemProps[] =>
            nodes.map((node) => {
              if (node.id === parentId) {
                return {
                  ...node,
                  children: [...(node.children || []), newItem],
                };
              }
              if (node.children && node.children.length) {
                return {
                  ...node,
                  children: addChild(node.children),
                };
              }
              return node;
            });
          if (!parentId) return { items: [...state.items, newItem] };
          return { items: addChild(state.items) };
        }),
      updateItem: (data, id, parentId) =>
        set((state) => {
          const updateChild = (nodes: AllNavItemProps[]): AllNavItemProps[] =>
            nodes.map((node) => {
              if (node.id === parentId) {
                const children = node.children;
                if (children) {
                  node.children?.forEach((item, itemIndex) => {
                    if (item.id === id) {
                      children[itemIndex] = {
                        ...children[itemIndex],
                        ...data,
                      };
                    }
                  });
                }

                return {
                  ...node,
                  children,
                };
              }
              if (node.children && node.children.length) {
                return {
                  ...node,
                  children: updateChild(node.children),
                };
              }
              return node;
            });
          if (!parentId) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, ...data } : item
              ),
            };
          }
          return { items: updateChild(state.items) };
        }),
      deleteItem: (id, parentId) =>
        set((state) => {
          const deleteChild = (nodes: AllNavItemProps[]): AllNavItemProps[] =>
            nodes.map((node) => {
              if (node.id === parentId) {
                const children = node.children;
                if (children) {
                  node.children?.forEach((item, itemIndex) => {
                    if (item.id === id) {
                      children.splice(itemIndex, 1);
                    }
                  });
                }

                return {
                  ...node,
                  children,
                };
              }
              if (node.children && node.children.length) {
                return {
                  ...node,
                  children: deleteChild(node.children),
                };
              }
              return node;
            });
          if (!parentId) {
            const currentItemIndex = state.items.findIndex(
              (item) => item.id === id
            );
            if (currentItemIndex > -1) {
              const newData = state.items.slice();
              newData.splice(currentItemIndex, 1);
              return { items: newData };
            }
          }
          return { items: deleteChild(state.items) };
        }),
      setLoaded: () => set({ isLoaded: true }),
      resortItem: (activeId, overId) => {
        if (activeId !== overId) {
          set((state) => {
            const resortChild = (nodes: AllNavItemProps[]): AllNavItemProps[] =>
              nodes.map((node) => {
                if (node.children && node.children.length) {
                  const childOldIndex = node.children.findIndex(
                    (item) => item.id === activeId
                  );
                  if (childOldIndex > -1) {
                    const childNewIndex = node.children.findIndex(
                      (item) => item.id === overId
                    );
                    const newData = node.children.slice();
                    const [removed] = newData.splice(childOldIndex, 1);
                    newData.splice(childNewIndex, 0, removed);
                    return { ...node, children: newData };
                  }
                  return {
                    ...node,
                    children: resortChild(node.children),
                  };
                }
                return node;
              });

            const flatOldIndex = state.items.findIndex(
              (item) => item.id === activeId
            );
            if (flatOldIndex > -1) {
              const flatNewIndex = state.items.findIndex(
                (item) => item.id === overId
              );
              const newData = state.items.slice();
              const [removed] = newData.splice(flatOldIndex, 1);
              newData.splice(flatNewIndex, 0, removed);
              return { items: newData };
            }
            return { items: resortChild(state.items) };
          });
        }
      },
    }),
    {
      name: "nav",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded();
        }
      },
    }
  )
);

export { useNavStore };
