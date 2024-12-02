import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/button";
import { MenuPanelForm } from "@/components/menu/panel/form";
import PlusIcon from "@/assets/icons/plus-circle.svg";
import { IconSize } from "@/lib/constans";

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
      <Button variant="outline-primary" onClick={toggleView}>
        <Image
          aria-hidden
          src={PlusIcon}
          alt="Dodaj"
          width={IconSize.m}
          height={IconSize.m}
        />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};

export { MenuPanelEmpty };
