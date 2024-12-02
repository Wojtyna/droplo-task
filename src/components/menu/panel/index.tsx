"use client";
import { useShallow } from "zustand/shallow";

import { MenuPanelEmpty } from "@/components/menu/panel/empty";
import { MenuPanelItems } from "@/components/menu/panel/items";
import { useStore } from "@/store";

const MenuPanel = () => {
  const [items] = useStore(useShallow((store) => [store.items]));

  return (
    <div className="w-full">
      {items.length ? <MenuPanelItems items={items} /> : <MenuPanelEmpty />}
    </div>
  );
};

export { MenuPanel };
