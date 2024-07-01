import { AllHTMLAttributes, FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "./ui/progress";
import { QuizI } from "@/lib/types";

interface ParticipantsTableProps extends AllHTMLAttributes<HTMLDivElement> {
  quiz: QuizI;
  totalQuestions: number;
}

const ParticipantsTable: FC<ParticipantsTableProps> = ({ quiz, totalQuestions, ...props }) => {
  return (
    <Table className='w-full' {...props}>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>Serial</TableHead>
          <TableHead className='w-[100px]'>Date</TableHead>
          <TableHead className='w-[100px]'>Time</TableHead>
          <TableHead>Participant</TableHead>
          <TableHead className='w-[50px] md:w-[150px]'>Score</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {quiz.participants.map((participant, idx) => (
          <TableRow key={participant._id?.toString()}>
            <TableCell className='text-center'>{idx + 1}</TableCell>
            <TableCell className=''>{new Date(participant.timestamp).toLocaleDateString()}</TableCell>
            <TableCell className=''>{new Date(participant.timestamp).toLocaleTimeString()}</TableCell>
            <TableCell className='truncate'>{participant.name}</TableCell>
            <TableCell className=''>
              <div className='flex items-center gap-2'>
                <p className='text-primary/60 font-semibold'>
                  <span className='font-bold text-primary'>{participant.totalCorrect}</span>/<span>{totalQuestions}</span>
                </p>
                <Progress className='h-3 hidden md:block' value={(participant.totalCorrect / totalQuestions) * 100} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantsTable;
