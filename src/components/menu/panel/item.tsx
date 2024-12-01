import Image from "next/image";

import MoveIcon from "@/assets/icons/move.svg";
import { IconSize } from "@/lib/constans";
import { Button } from "@/components/button";

const MenuPanelItem = () => (
  <div className="w-full">
    <Image
      aria-hidden
      src={MoveIcon}
      alt="Przesuń"
      width={IconSize.m}
      height={IconSize.m}
    />
    <div>
      Promocje
      {"url"}
    </div>
    <div>
      <Button>Usuń</Button>
    </div>
  </div>
);

export { MenuPanelItem };
