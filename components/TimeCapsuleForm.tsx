"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";

import FileUpload from "./FileUpload";
import { TimeCapsuleStateType } from "@/app/page";

export default function TimeCapsuleForm({
  setTimeCapsules,
  timeCapsules,
}: {
  setTimeCapsules: Dispatch<SetStateAction<TimeCapsuleStateType[]>>;
  timeCapsules: TimeCapsuleStateType[];
}) {
  const [file, setFile] = useState<File | undefined>();
  const [openDate, setOpenDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!openDate) {
      setError("Please choose an open date.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`/api/files`, formData);
      const url = res?.data?.url;
      setTimeCapsules([
        ...timeCapsules,
        { url, openDate, created_at: new Date() },
      ]);
      setFile(undefined);
      setOpenDate(undefined);
    } catch (error: unknown) {
      console.error(error);
      setError(
        "An error occurred while creating the time capsule. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = parseISO(e.target.value);
    setOpenDate(selectedDate);
  };

  const isFormValid = file && openDate;

  return (
    <form className="flex flex-col gap-y-5 max-w-[480px]" onSubmit={onSubmit}>
      <FileUpload handleFile={setFile} file={file} />
      <div className="flex flex-col gap-y-2">
        <label className="text-sm text-gray-500" htmlFor="open-date">
          Open date
        </label>
        <input
          type="date"
          id="open-date"
          placeholder="Select open date"
          onChange={handleDateChange}
          value={openDate ? format(openDate, "yyyy-MM-dd") : ""}
          min={format(new Date(), "yyyy-MM-dd")}
          className="border py-1.5 px-3 rounded-md"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className="bg-black text-white py-2 px-4 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
