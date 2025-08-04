import { useRef, useState } from "react";
import type { DraggableItem } from "components/DragDropList/DraggableItem";
import DragDropList from "components/DragDropList/DragDropList";
import type { Semester } from "interfaces/Semester";
import SemesterListItem from "./SemesterListItem";

interface SemesterSelectProps {
  options: Semester[];
  selectedSemester: string;
  onAddSemester: (newSemester: string) => void;
  onChangeSelectedSemester: (selectedSemester: string) => void;
  onToggleSemesterIncluded: (semester: string) => void;
  onUpdateSemesterName: (semesterId: string, name: string) => void;
  onDeleteSemester: (semesterToDelete: string) => void;
  onMoveSemester: (fromIndex: number, toIndex: number) => void;
}

function SemesterSelect({
  options,
  selectedSemester,
  onAddSemester,
  onChangeSelectedSemester,
  onToggleSemesterIncluded,
  onUpdateSemesterName,
  onDeleteSemester,
  onMoveSemester,
}: SemesterSelectProps) {
  const addSemesterInput = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(true);

  return (
    <div className="w-5/6 max-w-lg p-2 border-1 border-solid rounded-md bg-shadow">
      <div className="mb-2 p-1 border-1 border-solid rounded-md">
        <div className="flex flex-wrap items-center p-0.5 rounded-sm select-none">
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
          className="grid transition-all duration-300 no-global-transition ease-in-out"
          style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <DragDropList
              onMoveItem={onMoveSemester}
              items={options.map(
                (option) =>
                  ({
                    key: option.id,
                    children: (
                      <SemesterListItem
                        semester={option}
                        isSelected={option.name === selectedSemester}
                        onChangeSelectedSemester={onChangeSelectedSemester}
                        onToggleSemesterIncluded={onToggleSemesterIncluded}
                        onUpdateSemesterName={onUpdateSemesterName}
                      />
                    ),
                  } as DraggableItem)
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center m-0 p-0">
        <input type="text" className="w-full" ref={addSemesterInput} />
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
