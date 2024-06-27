import { FC, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { QuestionTypes } from "./QuestionPage";

interface ChooseQuestionTypeDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  onSelect: (_: QuestionTypes) => void;
}

const ChooseQuestionTypeDialog: FC<ChooseQuestionTypeDialogProps> = ({ isOpen, closeDialog, onSelect }) => {
  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionTypes>("mcq");
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>select the type of question</DialogTitle>
          <DialogDescription>you can select among MCQ (single and multiple correct) and Descriptive type questions.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center justify-center'>
          <RadioGroup value={currentQuestionType} onValueChange={(val: QuestionTypes) => setCurrentQuestionType(val)}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='mcq' id='r1' />
              <Label htmlFor='r1'>MCQ</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='descriptive' id='r2' />
              <Label htmlFor='r2'>Descriptive</Label>
            </div>
          </RadioGroup>
          <Button
            className='mt-8'
            onClick={() => {
              onSelect(currentQuestionType);
              closeDialog();
            }}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseQuestionTypeDialog;
