import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button } from "@/components/button";
import { MenuPanelItem } from "@/components/menu/panel/item";
import { AllNavItemProps } from "@/types";
import { MenuPanelForm } from "@/components/menu/panel/form";

const MenuPanelItems = ({ items }: { items: AllNavItemProps[] }) => {
  const [addingItemMode, setAddingItemMode] = useState(false);

  const toggleAddingItemMode = () => {
    setAddingItemMode((prev) => !prev);
  };

  const handleDrag = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      // onChange(newItems);
      console.log(newItems);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg overflow-hidden border">
      <DndContext onDragEnd={handleDrag}>
        <SortableContext
          id="1"
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, itemIndex) => (
            <MenuPanelItem
              key={`MENU_PANEL_ITEM_${itemIndex}`}
              data={item}
              isFirst={itemIndex === 0}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="py-5 px-6">
        {addingItemMode ? (
          <MenuPanelForm exit={toggleAddingItemMode} />
        ) : (
          <Button variant="outline-secondary" onClick={toggleAddingItemMode}>
            Dodaj pozycję menu
          </Button>
        )}
      </div>
    </div>
  );
};

export { MenuPanelItems };
