import { useRef, useState } from "react";
import type { DraggableItem } from "components/DragDropList/DraggableItem";
import DragDropList from "components/DragDropList/DragDropList";
import type { Semester } from "interfaces/Semester";

interface SemesterSelectProps {
  options: Semester[];
  selectedSemester: string;
  onAddSemester: (newSemester: string) => void;
  onChangeSelectedSemester: (selectedSemester: string) => void;
  onToggleSemesterIncluded: (semester: string) => void;
  onDeleteSemester: (semesterToDelete: string) => void;
  onMoveSemester: (fromIndex: number, toIndex: number) => void;
}

function SemesterSelect({
  options,
  selectedSemester,
  onAddSemester,
  onChangeSelectedSemester,
  onToggleSemesterIncluded,
  onDeleteSemester,
  onMoveSemester,
}: SemesterSelectProps) {
  const addSemesterInput = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(true);

  function handleSemesterChange(semester: string) {
    onChangeSelectedSemester(semester);
  }

  return (
    <div className="w-1/2 p-2 border-1 border-solid rounded-md">
      <div className="flex items-center border-1 border-solid rounded-sm select-none">
        <div
          className="mx-2 cursor-pointer"
          onClick={() => setActive(() => !active)}
        >
          {selectedSemester + (active ? "-" : "+")}
        </div>
        <input
          type="button"
          value="Félév törlése"
          onClick={() => onDeleteSemester(selectedSemester)}
        />
      </div>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <DragDropList
            onMoveItem={onMoveSemester}
            items={options.map(
              (option) =>
                ({
                  key: option.name,
                  children: (
                    <div
                      onClick={(e) => {
                        if (!(e.target instanceof HTMLInputElement))
                          handleSemesterChange(option.name);
                      }}
                      className={`cursor-pointer active:cursor-grabbing ${
                        option.name === selectedSemester
                          ? "bg-red-300 dark:bg-red-900"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={option.included}
                        onChange={() => {
                          onToggleSemesterIncluded(option.name);
                        }}
                      />
                      {option.name}
                    </div>
                  ),
                } as DraggableItem)
            )}
          />
        </div>
      </div>
      <div className="flex items-center">
        <input type="text" ref={addSemesterInput} />
        <input
          type="button"
          value="Félév hozzáadása"
          onClick={() => {
            if (!addSemesterInput.current) return;
            onAddSemester(addSemesterInput.current.value);
            addSemesterInput.current.value = "";
          }}
        />
      </div>
    </div>
  );
}

export default SemesterSelect;
