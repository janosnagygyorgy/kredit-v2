import type { Subject } from "interfaces/Subject";
import type { DraggableItem } from "components/DragDropList/DraggableItem";
import SubjectListItem from "./SubjectListItem";
import SubjectListInput from "./SubjectListInput";
import DragDropList from "components/DragDropList/DragDropList";

interface SubjectListProps {
  subjects: Subject[];
  onAddSubject: (subject: Subject) => void;
  onUpdateSubject: (subjectId: string, subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
  onMoveSubject: (fromIndex: number, toIndex: number) => void;
}

function SubjectList({
  subjects,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  onMoveSubject,
}: SubjectListProps) {
  return (
    <div className="w-full max-w-2xl p-2 lg:mr-2 border-1 border-solid rounded-md">
      <SubjectListInput onAddSubject={onAddSubject} />
      <div className="px-2 py-0 border-solid border-1 rounded-md">
        <DragDropList
          onMoveItem={onMoveSubject}
          items={subjects.map(
            (subject) =>
              ({
                key: subject.id,
                children: (
                  <SubjectListItem
                    subject={subject}
                    onUpdateSubject={onUpdateSubject}
                    onDeleteSubject={onDeleteSubject}
                  />
                ),
              } as DraggableItem)
          )}
        />
      </div>
    </div>
  );
}

export default SubjectList;
