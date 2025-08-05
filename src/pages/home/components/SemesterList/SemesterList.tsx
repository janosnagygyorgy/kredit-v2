import { useRef, useState } from "react";
import type { DraggableItem } from "components/DragDropList/DraggableItem";
import DragDropList from "components/DragDropList/DragDropList";
import type { Semester } from "interfaces/Semester";
import SemesterListItem from "./SemesterListItem";

interface SemesterListProps {
  options: Semester[];
  selectedSemester: string;
  onAddSemester: (newSemester: string) => void;
  onChangeSelectedSemester: (selectedSemester: string) => void;
  onToggleSemesterIncluded: (semester: string) => void;
  onUpdateSemesterName: (semesterId: string, name: string) => void;
  onDeleteSemester: (semesterIdToDelete: string) => void;
  onMoveSemester: (fromIndex: number, toIndex: number) => void;
}

function SemesterList({
  options,
  selectedSemester,
  onAddSemester,
  onChangeSelectedSemester,
  onToggleSemesterIncluded,
  onUpdateSemesterName,
  onDeleteSemester,
  onMoveSemester,
}: SemesterListProps) {
  const addSemesterInput = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(true);

  return (
    <div className="w-full max-w-2xl p-2 border-1 border-solid rounded-md bg-shadow">
      <div className="flex items-center m-0 p-0">
        <input type="text" className="w-full" ref={addSemesterInput} />
        <input
          type="button"
          value="Félév hozzáadása"
          className="bg-success text-white border-black"
          onClick={() => {
            if (!addSemesterInput.current) return;
            onAddSemester(addSemesterInput.current.value);
            addSemesterInput.current.value = "";
          }}
        />
      </div>
      <div className="mt-2 p-1 border-1 border-solid rounded-md">
        <div
          className="h-10 flex flex-wrap items-center p-0.5 rounded-sm select-none cursor-pointer"
          onClick={() => setActive(() => !active)}
        >
          <div className="mx-2">
            {(options.find((s) => s.id === selectedSemester)?.name ?? "") +
              (active ? "-" : "+")}
          </div>
          {!active && (
            <input
              type="button"
              value="Félév törlése"
              className="text-white border-black bg-warning"
              onClick={() => onDeleteSemester(selectedSemester)}
            />
          )}
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
                        isSelected={option.id === selectedSemester}
                        onChangeSelectedSemester={onChangeSelectedSemester}
                        onToggleSemesterIncluded={onToggleSemesterIncluded}
                        onUpdateSemesterName={onUpdateSemesterName}
                        onDeleteSemester={onDeleteSemester}
                      />
                    ),
                  } as DraggableItem)
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemesterList;
