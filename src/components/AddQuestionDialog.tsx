import { Question, questionsContext } from "@/pages/dashboard/quiz";
import { FC, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

export type QuestionType = "mcq-s" | "mcq-m" | "short" | "long";
interface AddQuestionDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuestionDialog: FC<AddQuestionDialogProps> = ({ open, setOpen }) => {
  const { questions, setQuestions } = useContext(questionsContext);
  const [questionType, setQuestionType] = useState<QuestionType>("mcq-s");
  const form = useForm();

  function handleAdd() {
    setOpen(false);
    const id = uuidv4();
    switch (questionType) {
      case "mcq-s":
        {
          const newQuestion: Question = {
            id,
            type: "mcq-s",
            question: "",
            options: ["", ""],
            correct: "\n",
          };
          setQuestions && setQuestions((prev) => [...prev, newQuestion]);
        }
        break;
      case "mcq-m":
        {
          const newQuestion: Question = {
            id,
            type: "mcq-m",
            question: "",
            options: ["", "", "", ""],
            correct: [],
          };
          setQuestions && setQuestions((prev) => [...prev, newQuestion]);
        }
        break;
      case "short":
        {
          const newQuestion: Question = {
            id,
            type: "short",
            question: "",
            correct: "",
          };
          setQuestions && setQuestions((prev) => [...prev, newQuestion]);
        }
        break;
      case "long":
        {
          const newQuestion: Question = {
            id,
            type: "long",
            question: "",
            correct: "",
          };
          setQuestions && setQuestions((prev) => [...prev, newQuestion]);
        }
        break;
    }
  }
  function onQuestionAdd() {}
  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add a Question</DialogTitle>
          <DialogDescription>Select among MCQ (single answer), MCQ (multiple answers), Short answer, Long answer type questions.</DialogDescription>
        </DialogHeader>
        <div>
          <Select onValueChange={(val: QuestionType) => setQuestionType(val)} defaultValue='mcq-s'>
            <SelectTrigger>
              <SelectValue placeholder='select a question type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='mcq-s'>
                MCQ <span className='opacity-60 text-xs'>single answer</span>
              </SelectItem>
              <SelectItem value='mcq-m'>
                MCQ <span className='opacity-60 text-xs'>multiple answer</span>
              </SelectItem>
              <SelectItem value='short'>
                Short answer <span className='opacity-60 text-xs'>2 to 5 words</span>
              </SelectItem>
              <SelectItem value='long'>
                Long answer <span className='opacity-60 text-xs'>more than 5 words</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onQuestionAdd)}>
              <FormField
                control={form.control}
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder='what is the capital of India?' {...field} />
                    </FormControl>
                    <FormDescription>Enter the question here.</FormDescription>
                  </FormItem>
                )}
              />
              <div></div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleAdd}>
            add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;
