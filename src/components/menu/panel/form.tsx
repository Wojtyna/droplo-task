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

const MenuPanelForm = ({
  exit,
  parentId,
  nestedLevel = 0,
}: {
  exit: () => void;
  parentId?: string;
  nestedLevel?: number;
}) => {
  const addItem = useNavStore((store) => store.addItem);
  const formik = useFormik<NavItemProps>({
    initialValues: {
      title: "",
      url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Tytuł musi mieć co najmniej 3 znaki")
        .required("Tytuł jest wymagany"),
      url: Yup.string()
        .url("Wpisz poprawny URL, np. https://przykład.pl/")
        .required("Pole z linkiem jest wymagane"),
    }),
    onSubmit: (data, { resetForm }) => {
      // console.log(data, parentId);
      addItem(data, parentId);
      resetForm();
      exit();
    },
    validateOnBlur: false,
    validateOnChange: false,
    initialStatus: false,
  });

  const errorMessages = () =>
    Object.entries(formik.errors).map(([key, value]) => {
      if (formik.touched[key as keyof typeof formik.touched]) {
        return value;
      }
      return;
    });

  const handleCleanButton = () => {
    formik.resetForm();
  };

  return (
    <form
      className="grow min-w-fit flex py-5 px-6 gap-5 bg-white rounded-lg border"
      style={{
        marginLeft: parentId ? nestedLevel * 64 : 0,
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
          <Button variant="secondary" onClick={exit}>
            Anuluj
          </Button>
          <Button type="submit">Dodaj</Button>
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