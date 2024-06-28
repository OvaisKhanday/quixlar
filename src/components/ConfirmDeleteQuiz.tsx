import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import React from "react";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmDeleteQuizProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: ObjectId | null;
}

const ConfirmDeleteQuiz: FC<ConfirmDeleteQuizProps> = ({ isOpen, onClose, quizId }) => {
  const router = useRouter();
  const { toast } = useToast();
  async function deleteQuiz(quizId: ObjectId) {
    try {
      //TODO: replace url
      await fetch("http://localhost:3000/api/quiz/delete", {
        method: "POST",
        body: JSON.stringify({ quizId }),
      });
      toast({
        title: "Quiz got deleted",
        description: `The quiz with id ${quizId} got deleted`,
      });
      router.refresh();
    } catch (error) {
      //TODO: Show toast
    }
  }
  return (
    <AlertDialog open={!!quizId && isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this quiz and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteQuiz(quizId!)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteQuiz;
