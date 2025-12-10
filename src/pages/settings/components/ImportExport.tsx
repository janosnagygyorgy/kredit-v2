import type { StoredData } from "interfaces/StoredData";
import { useState } from "react";

interface ImportExportProps {
  data: StoredData;
  onImport: (data: StoredData) => void;
}

function ImportExport({ data, onImport }: ImportExportProps) {
  const [active, setActive] = useState(false);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    handleImport(file);
  };

  function handleImportClick() {
    fileInput.click();
  }

  function handleImportDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.dataTransfer.items.length === 0) return;
    const item = e.dataTransfer.items[0];
    if (item.kind !== "file") return;
    const file = item.getAsFile();
    if (!file) return;
    handleImport(file);
  }

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) return;
      const data = event.target?.result;
      if (typeof data !== "string") return;
      onImport(JSON.parse(data) as StoredData);
    };
    reader.readAsText(file);
  }

  function handleExport(data: string, filename: string, type: string) {
    const file = new Blob([data], { type: type });

    const exportLink = document.createElement("a");
    exportLink.href = URL.createObjectURL(file);
    exportLink.download = filename;
    exportLink.click();
  }

  return (
    <div>
      <h2>Tárgyak importálása/exportálása</h2>
      <div
        className={`h-40 w-2xs flex justify-center items-center my-1 cursor-pointer
          border-dashed border-1 rounded-2xl
          transition-all duration-200 ease-in-out
          ${active ? "bg-shadow" : ""}`}
        onClick={handleImportClick}
        onDragEnter={() => setActive(() => true)}
        onDragLeave={() => setActive(() => false)}
        onDrop={(e) => {
          setActive(() => false);
          handleImportDrop(e);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        Húzz ide egy fájlt a betöltéshez
      </div>
      <div>
        <input
          type="button"
          value="Export"
          className="bg-shadow"
          onClick={() =>
            handleExport(
              JSON.stringify(data),
              "export.json",
              "application/json"
            )
          }
        />
      </div>
    </div>
  );
}

export default ImportExport;
