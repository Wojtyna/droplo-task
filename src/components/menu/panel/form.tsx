import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/input";
import SearchIcon from "@/assets/icons/search-lg.svg";
import TrashIcon from "@/assets/icons/trash-03.svg";
import { Button } from "@/components/button";
import { IconSize } from "@/lib/constans";
import { useNavStore } from "@/store/nav";
import { NavItemProps } from "@/types";
import { useShallow } from "zustand/shallow";

const MenuPanelForm = ({
  exit,
  parentId,
  id,
  nestedLevel = 0,
  data,
}: {
  exit: () => void;
  id?: string;
  parentId?: string;
  nestedLevel?: number;
  data?: NavItemProps;
}) => {
  const [addItem, updateItem] = useNavStore(
    useShallow((store) => [store.addItem, store.updateItem])
  );
  const formik = useFormik<NavItemProps>({
    initialValues: {
      title: data?.title || "",
      url: data?.url || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Tytuł musi mieć co najmniej 3 znaki")
        .required("Tytuł jest wymagany"),
    }),
    onSubmit: (data, { resetForm }) => {
      if (isEditMode && id) {
        updateItem(data, id, parentId);
      } else {
        addItem(data, parentId);
      }
      resetForm();
      exit();
    },
    validateOnBlur: false,
    validateOnChange: false,
    initialStatus: false,
  });
  const isNested = nestedLevel > 0;
  const isEditMode = data && data.title;

  const errorMessages = () =>
    Object.entries(formik.errors).map(([key, value]) => {
      if (formik.touched[key as keyof typeof formik.touched]) {
        return value;
      }
      return;
    });

  const handleCleanButton = () => {
    formik.resetForm({
      values: {
        title: "",
        url: "",
      },
    });
  };

  return (
    <form
      className="grow min-w-fit flex py-5 px-6 gap-5 bg-white rounded-lg border"
      style={{
        marginLeft: isNested ? nestedLevel * 64 : 0,
      }}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            id="title"
            title="Nazwa"
            placeholder="np. Promocje"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            id="url"
            title="Link"
            placeholder="Wklej lub wyszukaj"
            iconSrc={SearchIcon}
            iconAlt="Szukaj"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {errorMessages()[0] && (
            <div className="text-sm text-red-600">* {errorMessages()[0]}</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline-secondary" onClick={exit}>
            Anuluj
          </Button>
          <Button variant="outline-primary" type="submit">
            {isEditMode ? "Edytuj" : "Dodaj"}
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={handleCleanButton}>
        <Image
          aria-hidden
          src={TrashIcon}
          alt="Usuń"
          width={IconSize.m}
          height={IconSize.m}
        />
      </Button>
    </form>
  );
};

export { MenuPanelForm };
