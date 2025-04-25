"use client";

import { Button, LabelButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPng } from "html-to-image";
import { useContext, useState } from "react";
import { CsvRecord } from "../types";
import { CertificateContext } from "./certificate";

export function CertificateForm() {
  const {
    certificateRef,
    recipientNameRef,
    dateRef,
    descriptionRef,
    backgroundImageRef,
    signatureRef,
  } = useContext(CertificateContext);

  const [csvFile, setCsvFile] = useState({
    name: "",
    data: [] as CsvRecord[],
  });

  const onRecipientNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    (recipientNameRef.current!.textContent =
      e.target.value || "[Recipient Name]");

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dateRef.current!.textContent = e.target.value || "[Date]";
    if (e.target.value.length > 0) e.target.classList.add("full");
    else e.target.classList.remove("full");
  };

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

  const onCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const rows = csv.trim().split("\n");
      const headers = rows[0].split(",");
      headers.forEach((header, index) => {
        headers[index] = header.trim().toLowerCase();
      });
      const headerIndices = {
        name: headers.indexOf("name"),
        description: headers.indexOf("description"),
        date: headers.indexOf("date"),
      };

      const json: CsvRecord[] = rows.slice(1).map((row) => {
        const values = row.split(",");

        return {
          name: values[headerIndices["name"]]
            .trim()
            .replace(/^["']|["']$/g, ""),
          description: values[headerIndices["description"]]
            .trim()
            .replace(/^["']|["']$/g, ""),
          date: values[headerIndices["date"]]
            .trim()
            .replace(/^["']|["']$/g, ""),
        };
      });
      setCsvFile({ name: file.name, data: json });
    };
    reader.readAsText(file);
  };

  async function downloadCertificate() {
    if (!certificateRef.current) {
      console.error("Certificate ref is not set");
      return;
    }

    await toPng(certificateRef.current, {
      cacheBust: true,
      canvasWidth: 3840,
      canvasHeight: 2880,
      pixelRatio: 1,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${recipientNameRef.current?.textContent}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await downloadCertificate();
  };

  const onBulkSubmit = async () => {
    if (!csvFile.data) return;
    for (const record of csvFile.data) {
      recipientNameRef.current!.textContent = record.name;
      dateRef.current!.textContent = record.date;
      descriptionRef.current!.textContent = record.description;
      await downloadCertificate();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
      <div className="grid grid-cols-2 gap-x-4">
        <Input
          onChange={onRecipientNameChange}
          placeholder="Recipient Name"
          type="text"
        />
        <Input
          className="w-full"
          onChange={onDateChange}
          placeholder="Date"
          type="date"
        />
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
          <LabelButton
            className="text-[0.6rem] sm:text-sm"
            htmlFor="background-file"
          >
            Upload Background
          </LabelButton>
          <Button
            className="border-red-500 text-[0.6rem] hover:border-red-500 hover:bg-red-500 hover:text-white sm:text-sm"
            type="button"
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
          <LabelButton
            className="text-[0.6rem] sm:text-sm"
            htmlFor="signature-file"
          >
            Upload Signature
          </LabelButton>
          <Button
            className="border-red-500 text-[0.6rem] hover:border-red-500 hover:bg-red-500 hover:text-white sm:text-sm"
            type="button"
            onClick={onSignatureFileClear}
          >
            Clear Signature
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-2">
        <Button
          className="border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white"
          type="submit"
        >
          Download
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="flex flex-col gap-y-1 text-white">
          <input
            id="csv-file"
            className="hidden"
            onChange={onCsvFileChange}
            type="file"
            accept=".csv"
          />
          <LabelButton htmlFor="csv-file">Upload CSV</LabelButton>
          <p className="text-center">{csvFile.name || "No File Uploaded"}</p>
        </div>
        <Button type="button" onClick={onBulkSubmit}>
          Generate Bulk Certificates
        </Button>
      </div>
    </form>
  );
}
