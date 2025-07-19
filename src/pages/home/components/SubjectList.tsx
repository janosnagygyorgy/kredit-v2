import type { Subject } from "../../../interfaces/Subject";
import SubjectListItem from "./SubjectListItem";
import SubjectListInput from "./SubjectListInput";
import DragDropList from "../../../components/DragDropList";
import type { DraggableItem } from "../../../interfaces/DraggableItem";

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
    <>
      <SubjectListInput onAddSubject={onAddSubject} />
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
    </>
  );
}

export default SubjectList;
