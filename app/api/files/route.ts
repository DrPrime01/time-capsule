import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file);
    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 360000,
    });
    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
