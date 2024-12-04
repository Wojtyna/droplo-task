import { useState } from "react";
import Image from "next/image";
// import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import MoveIcon from "@/assets/icons/move.svg";
import { IconSize } from "@/lib/constans";
import { Button } from "@/components/button";
import { AllNavItemProps } from "@/types";
import { useNavStore } from "@/store/nav";
import { cn } from "@/lib/classUtils";
import { MenuPanelForm } from "@/components/menu/panel/form";
import { DndContext } from "@dnd-kit/core";

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
  const [formMode, setFormMode] = useState<{
    isVisible: boolean;
    isEditMode: boolean;
  }>({
    isEditMode: false,
    isVisible: false,
  });
  const {
    attributes: draggableAttributes,
    listeners: draggableListeners,
    setNodeRef: setDraggableRef,
    transform: draggableTransform,
  } = useSortable({ id });

  const isNested = parentId && parentId !== "";

  const activateFormMode = (isEdit: boolean = false) => {
    setFormMode({
      isVisible: true,
      isEditMode: isEdit,
    });
  };
  const disableFormMode = () => {
    setFormMode({
      isVisible: false,
      isEditMode: false,
    });
  };

  // const handleDrag = (event: any) => {
  //   const { active, over } = event;
  //   if (over && active.id !== over.id) {
  //     const oldIndex = items.findIndex((item) => item.id === active.id);
  //     const newIndex = items.findIndex((item) => item.id === over.id);
  //     const newItems = [...items];
  //     const [removed] = newItems.splice(oldIndex, 1);
  //     newItems.splice(newIndex, 0, removed);
  //     // onChange(newItems);
  //     console.log(newItems);
  //   }
  // };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Obsłuż logikę przenoszenia elementów
    console.log("top Przeniesiono:", active.id, "do:", over.id);
  };

  const handleAddChildButton = () => {
    activateFormMode();
  };
  const handleEditButton = () => {
    activateFormMode(true);
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
          isNested && "rounded-bl-lg"
        )}
        style={{
          marginLeft: isNested ? nestedLevel * 64 : 0,
          transform: draggableTransform
            ? `translate3d(${draggableTransform.x}px, ${draggableTransform.y}px, 0)`
            : "none",
        }}
      >
        <div
          ref={setDraggableRef}
          className="shrink-0 size-10 flex justify-center items-center"
          {...draggableListeners}
          {...draggableAttributes}
        >
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
          <Button
            variant="outline-secondary"
            group="left"
            onClick={handleDeleteButton}
          >
            Usuń
          </Button>
          <Button
            variant="outline-secondary"
            group="center"
            onClick={handleEditButton}
          >
            Edytuj
          </Button>
          <Button
            variant="outline-secondary"
            group="right"
            onClick={handleAddChildButton}
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>

      {formMode.isVisible && formMode.isEditMode && (
        <div className="py-4 px-6">
          <MenuPanelForm
            exit={disableFormMode}
            parentId={id}
            nestedLevel={nestedLevel + 1}
            data={{
              title,
              url,
            }}
          />
        </div>
      )}

      {!!children?.length && (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            // id={id}
            items={children.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {children.map((item, itemIndex) => (
              <MenuPanelItem
                key={`MENU_PANEL_ITEM_${id}_CHILD_${itemIndex}`}
                data={item}
                isFirst={itemIndex === 0}
                parentId={id}
                nestedLevel={nestedLevel + 1}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {formMode.isVisible && !formMode.isEditMode && (
        <div className="py-4 px-6">
          <MenuPanelForm
            exit={disableFormMode}
            parentId={id}
            nestedLevel={nestedLevel + 1}
          />
        </div>
      )}
    </>
  );
};

export { MenuPanelItem };
