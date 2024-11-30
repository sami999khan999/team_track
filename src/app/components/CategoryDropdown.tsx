"use client";

import { CategoryType } from "@/types";
import {
  categoryDelete,
  createCategory,
  getCategories,
} from "@/utils/categoryApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown, IoMdAdd, IoMdArrowDropright } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const CategoryDropdown = ({
  setReload,
  reload,
  selectedCategory,
  setSelectedCategory,
  setCategoryId,
}: {
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
  setCategoryId: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputIsOpen, setInputOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>();

  const handleCategoryClick = (category: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(false);
    setSelectedCategory(category);
  };

  const handleBackdropClick = () => {
    setDropdownOpen(false);
    setInputOpen(false);
  };

  const addCtegory = async () => {
    setInputOpen(false);

    const category = {
      name: categoryInput,
    };

    const response = await createCategory(category);

    if (response.success) {
      setReload((prv) => !prv);
      setCategoryInput("");
    } else {
      console.log(response.message);
    }
  };

  const deleteCategory = async (id: number) => {
    const response = await categoryDelete(id);

    if (response.success) {
      setReload((prv) => !prv);
      console.log(response);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }
    };

    fetchCategories();
  }, [reload]);

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center">
          <div className="items-center space-y-2 w-full relative">
            <div
              className="flex items-center justify-between gap-3 border border-border_color bg-secondary-foreground  text-primary-foreground py-2 w-full rounded-full px-6 cursor-pointer group font-semibold"
              onClick={() => setDropdownOpen((prv) => !prv)}
            >
              <p
                className={`text-base xl:text-xl font-normal ${
                  selectedCategory === "Inter a category!" && "text-red-500"
                }`}
              >
                {selectedCategory ? selectedCategory : "Select Category"}
              </p>
              <div
                className={`${
                  dropdownOpen === true &&
                  "transition-transform rotate-180 duration-200"
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div>
              <div
                className="py-2 xl:text-lg flex items-center gap-3 w-full bg-secondary-foreground text-primary-foreground justify-center border border-border_color duration-200 cursor-pointer rounded-full mt-2"
                onClick={() => setInputOpen((prv) => !prv)}
              >
                <p>Add Category</p>
                <IoMdAdd />
              </div>
            </div>
            {inputIsOpen && (
              <div
                className="absolute w-full flex mt-2 items-center justify-center z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  placeholder="Enter new category"
                  name="category"
                  autoFocus
                  className="w-full px-6 text-xl text-primary-foreground bg-secondary-foreground border font-medium border-border_color rounded-l-full rounded-r-none focus:outline-none "
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && categoryInput.trim() !== "") {
                      addCtegory();
                    }
                  }}
                />
                <div
                  className="px-5 border border-border_color flex items-center py-1 xl:py-2 text-4xl bg-secondary-foreground hover:bg-secondary text-primary-foreground rounded rounded-r-full rounded-l-none duration-200"
                  onClick={addCtegory}
                >
                  <IoMdArrowDropright />
                </div>
              </div>
            )}

            {dropdownOpen ? (
              <div
                className="absolute w-full h-[10rem] transition-transform ease-in-out duration-200 overflow-auto rounded-lg z-50 remove-scrollbar bg-secondary-foreground border border-border_color"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2 py-4 space-y-2">
                  {categories?.map((category, i) => (
                    <div
                      key={i}
                      className="flex w-full items-center border border-border_color  text-primary-foreground text-lg capitalize font-semibold tracking-wide mt-1  hover:bg-secondary duration-200 rounded-md px-1"
                    >
                      <div
                        className="py-1 px-4 cursor-pointer rounded-md w-full "
                        onClick={(event) => {
                          handleCategoryClick(category.name, event);
                          setCategoryId(category.id);
                        }}
                      >
                        <div className="flex gap-2">
                          <p>{category.id}.</p>
                          <p>{category.name}</p>
                        </div>
                      </div>
                      <div
                        className="ml-auto bg-secondary-foreground hover:bg-primary rounded-sm text-primary-foreground hover:text-background duration-200"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {(dropdownOpen || inputIsOpen) && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleBackdropClick}
        ></div>
      )}
    </>
  );
};

export default CategoryDropdown;
