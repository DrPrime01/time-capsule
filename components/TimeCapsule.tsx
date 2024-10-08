import Image from "next/image";
import { format } from "date-fns";

import InfoIcon from "@/assets/icons/info-icon";
import LockIcon from "@/assets/icons/lock-icon";
import { TimeCapsuleStateType } from "@/types";

export default function TimeCapsule({
  url,
  openDate,
  created_at,
}: TimeCapsuleStateType) {
  return (
    <div className="flex flex-col gap-y-2 max-w-[240px]">
      <div className="relative">
        <Image
          src={url}
          width={240}
          height={240}
          alt="time capsule"
          className="object-cover aspect-square"
        />
        {new Date() < new Date(openDate) && (
          <div className="absolute bg-black/85 inset-0 flex items-center justify-center">
            <LockIcon />
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-700">
        To be opened on {format(openDate, "dd/MM/yyyy")}
      </p>
      <div className="bg-gray-200 flex space-x-1.5 p-2 rounded-xl">
        <InfoIcon />
        <p className="text-xs text-gray-500">
          This time capsule was created on {format(created_at, "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
