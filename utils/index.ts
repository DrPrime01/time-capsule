import { TimeCapsuleStateType } from "@/types";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const serializeTimeCapsule = (capsule: TimeCapsuleStateType) => ({
  ...capsule,
  openDate: capsule.openDate.toISOString(),
  created_at: capsule.created_at.toISOString(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserializeTimeCapsule = (capsule: any): TimeCapsuleStateType => ({
  ...capsule,
  openDate: new Date(capsule.openDate),
  created_at: new Date(capsule.created_at),
});
