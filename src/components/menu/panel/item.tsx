import { useState } from "react";
import Image from "next/image";

import MoveIcon from "@/assets/icons/move.svg";
import { IconSize } from "@/lib/constans";
import { Button } from "@/components/button";
import { AllNavItemProps } from "@/types";
import { useNavStore } from "@/store/nav";
import { cn } from "@/lib/classUtils";
import { MenuPanelForm } from "@/components/menu/panel/form";

const MenuPanelItem = ({
  data: { title, url, id, children },
  parentId,
  isFirst = false,
  nestedLevel = 0,
}: {
  data: AllNavItemProps;
  parentId?: string;
  isFirst?: boolean;
  nestedLevel?: number;
}) => {
  const deleteItem = useNavStore((state) => state.deleteItem);
  const [addingChildMode, setAddingChildMode] = useState(false);

  const toggleAddingChildMode = () => {
    setAddingChildMode((prev) => !prev);
  };

  const handleDeleteButton = () => {
    deleteItem(id, parentId);
  };

  return (
    <>
      <div
        className={cn(
          "grow min-w-fit flex items-center py-4 px-6 gap-1 bg-white border border-secondary-200",
          isFirst && "border-t-0",
          parentId && "rounded-bl-lg"
        )}
        style={{
          marginLeft: parentId ? nestedLevel * 64 : 0,
        }}
      >
        <div className="shrink-0 size-10 flex justify-center items-center">
          <Image
            aria-hidden
            src={MoveIcon}
            alt="Przesuń"
            width={IconSize.m}
            height={IconSize.m}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1.5 text-sm">
          <span className="font-semibold">{title}</span>
          <span className="text-secondary-500">{url}</span>
        </div>
        <div className="shrink-0">
          <Button variant="secondary" group="left" onClick={handleDeleteButton}>
            Usuń
          </Button>
          <Button
            variant="secondary"
            group="center"
            onClick={toggleAddingChildMode}
          >
            Edytuj
          </Button>
          <Button
            variant="secondary"
            group="right"
            onClick={toggleAddingChildMode}
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>

      {!!children?.length &&
        children.map((item, itemIndex) => (
          <MenuPanelItem
            key={`MENU_PANEL_ITEM_${id}_CHILD_${itemIndex}`}
            data={item}
            isFirst={itemIndex === 0}
            parentId={id}
            nestedLevel={nestedLevel + 1}
          />
        ))}

      {addingChildMode && (
        <div className="py-4 px-6">
          <MenuPanelForm
            exit={toggleAddingChildMode}
            parentId={id}
            nestedLevel={nestedLevel + 1}
          />
        </div>
      )}
    </>
  );
};

export { MenuPanelItem };
