"use client";

import { Upload } from "lucide-react";

export function UploadDropzone({
  title,
  hint,
  sizeHint,
}: {
  title: string;
  hint: string;
  sizeHint: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="upload-zone flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl px-4 py-8 text-center"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") e.preventDefault();
      }}
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Upload className="size-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted">{hint}</p>
        <p className="mt-1 text-xs text-muted">{sizeHint}</p>
      </div>
    </div>
  );
}
