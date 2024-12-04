import { useState } from "react";

import { Button } from "@/components/button";
import { MenuPanelItem } from "@/components/menu/panel/item";
import { AllNavItemProps } from "@/types";
import { MenuPanelForm } from "@/components/menu/panel/form";

const MenuPanelItems = ({ items }: { items: AllNavItemProps[] }) => {
  const [addingItemMode, setAddingItemMode] = useState(false);

  const toggleAddingItemMode = () => {
    setAddingItemMode((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col rounded-lg overflow-hidden border">
      {items.map((item, itemIndex) => (
        <MenuPanelItem
          key={`MENU_PANEL_ITEM_${itemIndex}`}
          data={item}
          isFirst={itemIndex === 0}
        />
      ))}
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
