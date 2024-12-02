"use client";
import { useShallow } from "zustand/shallow";

import { MenuPanelEmpty } from "@/components/menu/panel/empty";
import { MenuPanelItems } from "@/components/menu/panel/items";
import { useNavStore } from "@/store/nav";
import { MenuPanelEmptyLoader } from "@/components/menu/panel/loader";

const MenuPanel = () => {
  const [items, itemsLoaded] = useNavStore(
    useShallow((state) => [state.items, state.isLoaded])
  );
  console.log(items);
  if (!itemsLoaded) return <MenuPanelEmptyLoader />;
  return (
    <div className="w-full">
      {items.length ? <MenuPanelItems items={items} /> : <MenuPanelEmpty />}
    </div>
  );
};

export { MenuPanel };
