"use client";
import { useShallow } from "zustand/shallow";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { MenuPanelEmpty } from "@/components/menu/panel/empty";
import { MenuPanelItems } from "@/components/menu/panel/items";
import { useNavStore } from "@/store/nav";
import { MenuPanelEmptyLoader } from "@/components/menu/panel/loader";

const MenuPanel = () => {
  const [items, itemsLoaded, resortItem] = useNavStore(
    useShallow((state) => [state.items, state.isLoaded, state.resortItem])
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    resortItem(String(active.id), String(over.id));
  };

  if (!itemsLoaded) return <MenuPanelEmptyLoader />;
  return (
    <div className="w-full">
      {items.length ? (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <MenuPanelItems items={items} />
          </SortableContext>
        </DndContext>
      ) : (
        <MenuPanelEmpty />
      )}
    </div>
  );
};

export { MenuPanel };
