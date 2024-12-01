import Image from "next/image";

import { Input } from "@/components/input";
import SearchIcon from "@/assets/icons/search-lg.svg";
import TrashIcon from "@/assets/icons/trash-03.svg";
import { Button } from "@/components/button";
import { IconSize } from "@/lib/constans";

const MenuPanelNewItem = ({ exit }: { exit?: () => void }) => (
  <div className="w-full flex py-5 px-6 gap-5 bg-white rounded-lg border">
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input title="Nazwa" placeholder="np. Promocje" />
        <Input
          title="Link"
          placeholder="Wklej lub wyszukaj"
          iconSrc={SearchIcon}
          iconAlt="Szukaj"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={exit}>
          Anuluj
        </Button>
        <Button>Dodaj</Button>
      </div>
    </div>
    <Button variant="ghost" size="icon" onClick={exit}>
      <Image
        aria-hidden
        src={TrashIcon}
        alt="Usuń"
        width={IconSize.m}
        height={IconSize.m}
      />
    </Button>
  </div>
);

export { MenuPanelNewItem };
