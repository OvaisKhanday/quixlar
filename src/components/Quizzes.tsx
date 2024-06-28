import { QuizI } from "@/pages/dashboard/quiz";
import { Cross2Icon, Share1Icon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ObjectId } from "mongodb";
import ConfirmDeleteQuiz from "./ConfirmDeleteQuiz";
import ShareQuizIdDialog from "./ShareQuizIdDialog";

interface QuizzesProps {
  quizzes: QuizI[];
}

const Quizzes: FC<QuizzesProps> = ({ quizzes }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteQuizId, setDeleteQuizId] = useState<ObjectId | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [shareQuizId, setShareQuizId] = useState<ObjectId | null>(null);
  function onDeleteHandler(id: ObjectId) {
    setDeleteQuizId(id);
    setIsDeleteDialogOpen(true);
  }

  function shareId(quizId: ObjectId) {
    setShareQuizId(quizId);
    setIsShareDialogOpen(true);
  }

  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>Serial</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className='w-[100px]'>Date</TableHead>
            <TableHead className='w-[50px]'>Share</TableHead>
            <TableHead className='w-[50px]'>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {quizzes.map((quiz, idx) => (
            <TableRow key={quiz._id?.toString()}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className='truncate'>{quiz.title}</TableCell>
              <TableCell>{new Date(quiz.timestamp).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button onClick={() => shareId(quiz._id!)}>
                  <Share1Icon />
                </Button>
              </TableCell>
              <TableCell className='flex items-center justify-center'>
                <Button variant='outline' onClick={() => onDeleteHandler(quiz._id!)}>
                  <Cross2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDeleteQuiz isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} quizId={deleteQuizId} />
      <ShareQuizIdDialog isOpen={isShareDialogOpen} quizId={shareQuizId} onClose={() => setIsShareDialogOpen(false)} />
    </>
  );
};

export default Quizzes;
