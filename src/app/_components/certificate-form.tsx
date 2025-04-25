"use client";

import { Button, LabelButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { CertificateContext } from "./certificate";

export function CertificateForm() {
  const {
    recipientNameRef,
    dateRef,
    descriptionRef,
    backgroundImageRef,
    signatureRef,
  } = useContext(CertificateContext);

  const onRecipientNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    (recipientNameRef.current!.textContent =
      e.target.value || "[Recipient Name]");
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    (dateRef.current!.textContent = e.target.value || "[Date]");
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    (descriptionRef.current!.textContent = e.target.value || "[Description]");
  const onBackgroundFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      backgroundImageRef.current!.href.baseVal = event.target?.result as string;
    };
    reader.readAsDataURL(file!);
  };
  const onBackgroundFileClear = () =>
    (backgroundImageRef.current!.href.baseVal = "/template-1.jpg");
  const onSignatureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      signatureRef.current!.href.baseVal = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
  const onSignatureFileClear = () =>
    (signatureRef.current!.href.baseVal =
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="grid grid-cols-2 gap-x-4">
        <Input
          onChange={onRecipientNameChange}
          placeholder="Recipient Name"
          type="text"
        />
        <Input onChange={onDateChange} placeholder="Date" type="date" />
      </div>
      <div className="grid grid-cols-1">
        <textarea
          className="resize-none rounded-lg border border-gray-400 px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out outline-none focus:border-white"
          onChange={onDescriptionChange}
          placeholder="Description"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="grid grid-cols-2 gap-x-2">
          <input
            id="background-file"
            className="hidden"
            onChange={onBackgroundFileChange}
            type="file"
            accept="image/*"
          />
          <LabelButton htmlFor="background-file">Upload Background</LabelButton>
          <Button
            className="border-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
            onClick={onBackgroundFileClear}
          >
            Clear Background
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <input
            id="signature-file"
            className="hidden"
            onChange={onSignatureFileChange}
            type="file"
            accept="image/*"
          />
          <LabelButton htmlFor="signature-file">Upload Signature</LabelButton>
          <Button
            className="border-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
            onClick={onSignatureFileClear}
          >
            Clear Signature
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-2">
        <Button className="border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white">
          Download
        </Button>
      </div>
    </div>
  );
}
