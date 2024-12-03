"use client";

import { DropdownType } from "@/types";
import React, { SetStateAction, useState } from "react";

const DropdownBody = ({
  type,
  i,
  setId,
  setValue,
  item,
  setIsDropdownOpen,
  setSelectionError,
  setSelectedId,
  selectedId,
  setSelectedItem,
}: {
  type:
    | "product"
    | "employee"
    | "production"
    | "status"
    | "customer"
    | "Method";
  i: number;
  setId?: React.Dispatch<SetStateAction<number | undefined>>;
  setValue?: React.Dispatch<SetStateAction<string | undefined>>;
  item: DropdownType;
  setIsDropdownOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectionError?: React.Dispatch<SetStateAction<string>>;
  setSelectedId: React.Dispatch<SetStateAction<number | undefined>>;
  selectedId: number | undefined;
  setSelectedItem: React.Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <>
      {type === "employee" && (
        <div
          className="table-col text-base py-2"
          onClick={() => {
            const currentId = Number(item.id);
            if (selectedId === currentId) {
              if (setId) setId(undefined);
              setSelectedItem(undefined);
              setSelectedId(undefined);
              if (setValue) setValue(undefined);
              if (setSelectionError) setSelectionError("");
              setIsDropdownOpen((prv) => !prv);
            } else {
              if (setId) setId(currentId);
              setSelectedItem(item.name);
              setSelectedId(currentId);
              // console.log("Dropdown", currentId);
              if (setValue) setValue(item.name);
              if (setSelectionError) setSelectionError("");
              setIsDropdownOpen((prv) => !prv);
            }
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.name}</div>
          <div className="flex-1 truncate-text">{item.mobile}</div>
        </div>
      )}

      {type === "product" && (
        <div
          className="table-col text-base py-2 "
          onClick={() => {
            const currentId = Number(item.id);

            if (selectedId === currentId) {
              if (setId) setId(undefined);
              setSelectedItem(undefined);
              setSelectedId(undefined);
              if (setValue) setValue(undefined);
              if (setSelectionError) setSelectionError("");
              setIsDropdownOpen((prv) => !prv);
            } else {
              if (setId) setId(currentId);
              setSelectedItem(item.name);
              setSelectedId(currentId);
              if (setValue) setValue(item.name);
              if (setSelectionError) setSelectionError("");
              setIsDropdownOpen((prv) => !prv);
            }
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.name}</div>
          <div className="flex-1 truncate-text">{item.rate}/=</div>
        </div>
      )}

      {type === "production" && (
        <div
          className="table-col text-base py-2"
          onClick={() => {
            const currentId = Number(item.id);

            if (selectedId === currentId) {
              if (setId) setId(undefined);
              setSelectedItem(undefined);
              setSelectedId(undefined);
              setIsDropdownOpen((prv) => !prv);
              if (setSelectionError) setSelectionError("");
            } else {
              if (setId) setId(currentId);
              setSelectedItem(item.product?.name);
              setSelectedId(currentId);
              setIsDropdownOpen((prv) => !prv);
              if (setSelectionError) setSelectionError("");
            }
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.product?.name}</div>
          <div className="flex-1 truncate-text">{item.employee?.name}</div>
          <div className="flex-1 truncate-text">{item.quantity}</div>
        </div>
      )}

      {type === "status" && (
        <div
          className="table-col text-base py-2"
          onClick={() => {
            if (setValue) setValue(item.status);
            setSelectedItem(item.status);
            setIsDropdownOpen((prv) => !prv);
            if (setSelectionError) setSelectionError("");
          }}
        >
          <div className="w-1/6 truncate-text">{i + 1}</div>
          <div className="flex-1 truncate-text">{item.status}</div>
        </div>
      )}

      {type === "customer" && (
        <div
          className="table-col text-base py-2"
          onClick={() => {
            const currentId = Number(item.id);

            if (selectedId === currentId) {
              if (setId) setId(undefined);
              setSelectedItem(undefined);
              setSelectedId(undefined);
              setIsDropdownOpen((prv) => !prv);
              if (setSelectionError) setSelectionError("");
            } else {
              if (setId) setId(currentId);
              setSelectedItem(item.name);
              setSelectedId(currentId);
              setIsDropdownOpen((prv) => !prv);
              if (setSelectionError) setSelectionError("");
            }
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.name}</div>
          <div className="flex-1 truncate-text">
            {item.company_name === "" ? "NONE" : item.company_name}
          </div>
        </div>
      )}

      {type === "Method" && (
        <div
          className="table-col text-base py-2"
          onClick={() => {
            if (setValue) setValue(item.method);
            setSelectedItem(item.method);
            setIsDropdownOpen((prv) => !prv);
            if (setSelectionError) setSelectionError("");
          }}
        >
          <div className="">{item.method}</div>
        </div>
      )}
    </>
  );
};

export default DropdownBody;
