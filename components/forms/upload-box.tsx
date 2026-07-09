"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { useId, useRef } from "react";

type UploadBoxProps = {
  title: string;
  hint: string;
  sizeHint: string;
  variant?: "icon" | "banner";
  previewUrl?: string | null;
  onFile?: (file: File, previewUrl: string) => void;
  onClear?: () => void;
};

export function UploadBox({
  title,
  hint,
  sizeHint,
  variant = "banner",
  previewUrl,
  onFile,
  onClear,
}: UploadBoxProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onFile?.(file, url);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className={[
          "upload-zone group relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl text-center transition-all duration-200",
          variant === "icon" ? "aspect-square max-w-[160px] p-4" : "min-h-[140px] w-full px-4 py-8",
          previewUrl ? "border-solid border-accent/40 p-0" : "",
        ].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={`${title} preview`}
            className={[
              "h-full w-full object-cover",
              variant === "icon" ? "rounded-2xl" : "min-h-[140px]",
            ].join(" ")}
          />
        ) : (
          <>
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent/15">
              {variant === "icon" ? (
                <Upload className="size-5" />
              ) : (
                <ImagePlus className="size-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-xs text-muted">{hint}</p>
              <p className="mt-1 text-xs text-muted">{sizeHint}</p>
            </div>
          </>
        )}
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {previewUrl && onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
          Remove image
        </button>
      ) : null}
    </div>
  );
}
