"use client";
import { useState } from "react";

import TimeCapsule from "@/components/TimeCapsule";
import TimeCapsuleForm from "@/components/TimeCapsuleForm";

export interface TimeCapsuleStateType {
  url: string;
  openDate: Date;
  created_at: Date;
}

export default function Home() {
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleStateType[]>([]);

  return (
    <main className="container mx-auto my-10 flex flex-col gap-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">
          Create a Time Capsule
        </h2>
        <TimeCapsuleForm
          setTimeCapsules={setTimeCapsules}
          timeCapsules={timeCapsules}
        />
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">
          View Your Time Capsules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timeCapsules &&
            timeCapsules?.map((capsule) => (
              <TimeCapsule
                key={capsule.url}
                url={capsule.url}
                openDate={capsule.openDate}
                created_at={capsule.created_at}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
