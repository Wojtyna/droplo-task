import { useState } from "react";
import Image from "next/image";
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
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useShallow } from "zustand/shallow";

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
  const [deleteItem, resortItem] = useNavStore(
    useShallow((state) => [state.deleteItem, state.resortItem])
  );
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    resortItem(String(active.id), String(over.id));
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
        ref={setDraggableRef}
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
          <span className="text-secondary-500">{url || "Brak linku..."}</span>
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
            id={id}
            parentId={parentId}
            nestedLevel={nestedLevel + 1}
            data={{
              title,
              url,
            }}
            exit={disableFormMode}
          />
        </div>
      )}

      {!!children?.length && (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
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
            parentId={id}
            nestedLevel={nestedLevel + 1}
            exit={disableFormMode}
          />
        </div>
      )}
    </>
  );
};

export { MenuPanelItem };
