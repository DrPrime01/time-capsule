import { convertFileToUrl } from "@/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Dropzone, {
  DropzoneInputProps,
  DropzoneRootProps,
} from "react-dropzone";

interface DropzonePropTypes {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  isDragActive: boolean;
}

export default function FileUpload({
  handleFile,
  file,
}: {
  handleFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
}) {
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => {
        handleFile(acceptedFiles[0]);
      }}
      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }: DropzonePropTypes) => (
        <section className="flex flex-col gap-y-2">
          <label className="text-sm text-gray-500" htmlFor="file-input">
            Choose File
          </label>
          <div
            {...getRootProps()}
            className="border border-dotted bg-gray-100 h-[200px] flex flex-col items-center justify-center rounded-md"
          >
            <input {...getInputProps()} className="sr-only" id="file-input" />
            {!file ? (
              <>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p className="font-medium cursor-pointer">
                    Drop your file here or{" "}
                    <span className="underline">browse</span>
                  </p>
                )}
                <p className="text-gray-500 text-xs">JPG, PNG, PDF - 5MB max</p>
              </>
            ) : (
              <Image
                src={convertFileToUrl(file)}
                alt="image"
                height={200}
                width={320}
                className="object-cover h-[200px] w-full rounded-md"
              />
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
