import { useState } from "react";

import { Button } from "@/components/button";
import { MenuPanelForm } from "@/components/menu/panel/form";

const MenuPanelEmpty = () => {
  const [isNewItemView, setIsNewItemView] = useState(false);

  const toggleView = () => {
    setIsNewItemView((prev) => !prev);
  };

  if (isNewItemView) return <MenuPanelForm exit={toggleView} />;
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 px-6 gap-6 bg-secondary-100 rounded-lg border border-secondary-200 text-center">
      <div className="flex flex-col gap-1">
        <b>Menu jest puste</b>
        <span className="text-secondary-500 text-sm">
          W tym menu nie ma jeszcze żadnych linków.
        </span>
      </div>
      <Button onClick={toggleView}>Dodaj pozycję menu</Button>
    </div>
  );
};

export { MenuPanelEmpty };
