import { useState } from "react";

import { Button } from "@/components/button";
import { MenuPanelItem } from "@/components/menu/panel/item";
import { AllNavItemProps } from "@/types";
import { MenuPanelNewItem } from "@/components/menu/panel/newItem";

const MenuPanelItems = ({ items }: { items: AllNavItemProps[] }) => {
  const [addingItemMode, setAddingItemMode] = useState(false);

  const toggleAddingItemMode = () => {
    setAddingItemMode((prev) => !prev);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border">
      {items.map((item, itemIndex) => (
        <MenuPanelItem
          key={`MENU_PANEL_ITEM_${itemIndex}`}
          data={item}
          isFirst={itemIndex === 0}
        />
      ))}
      <div className="py-5 px-6">
        {addingItemMode ? (
          <MenuPanelNewItem exit={toggleAddingItemMode} />
        ) : (
          <Button variant="secondary" onClick={toggleAddingItemMode}>
            Dodaj pozycję menu
          </Button>
        )}
      </div>
    </div>
  );
};

export { MenuPanelItems };
