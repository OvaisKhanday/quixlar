import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { ObjectId } from "mongodb";
import { FC } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/router";

interface ShareQuizIdDialogProps {
  quizId: ObjectId | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShareQuizIdDialog: FC<ShareQuizIdDialogProps> = ({ isOpen, onClose, quizId }) => {
  const { toast } = useToast();

  function copyQuizId(quizId: ObjectId) {
    //todo: copy
    navigator.clipboard.writeText(getShareURL(quizId));
    toast({
      title: "Copied to clipboard",
      description: "quiz link has been copied to clipboard, share with users to enable them to take exam",
    });
    onClose();
  }
  function getShareURL(quizId: ObjectId) {
    return `${window.location.origin}/takeQuiz/${quizId}`;
  }
  return (
    <Dialog open={!!quizId && isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Quiz</DialogTitle>
          <DialogDescription>Share the link to the participants, they will be asked to enter their name to play the quiz.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Input defaultValue={getShareURL(quizId!)} disabled />
          <Button size='icon' onClick={() => copyQuizId(quizId!)}>
            <ClipboardCopyIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareQuizIdDialog;
