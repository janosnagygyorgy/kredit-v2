function ImportExport() {
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
      // TODO: onImport(data);
      console.log(data);
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
    <>
      <div
        style={{
          height: "200px",
          width: "500px",
          border: "1px dashed black",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleImportClick}
        onDrop={handleImportDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        Hi there
      </div>

      <div>
        <input
          type="button"
          value="Export"
          onClick={() =>
            handleExport("File content", "export.txt", "text/plain")
          }
        />
      </div>
    </>
  );
}

export default ImportExport;
