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
            let currentItem = state.items
              .slice()
              .find((item) => item.id === id);
            if (currentItem) {
              currentItem = {
                ...currentItem,
                ...data,
              };
              return { items: [...state.items, currentItem] };
            }
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
