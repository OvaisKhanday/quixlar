import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface QuizDetailsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  quizId: string;
}

const QuizDetails: FC<QuizDetailsProps> = ({ title, description, quizId, ...props }) => {
  const [currentURL, setCurrentURL] = useState<string>("");
  const { toast } = useToast();
  useEffect(() => {
    setCurrentURL(location.origin);
  }, []);
  function copyQuizId(quizId: string) {
    navigator.clipboard.writeText(getShareURL(quizId));
    toast({
      title: "Copied to clipboard",
      description: "quiz link has been copied to clipboard, share with users to enable them to take exam",
    });
  }
  function getShareURL(quizId: string) {
    return `${currentURL}/takeQuiz/${quizId}`;
  }
  return (
    <Card className='text-center dark' {...props}>
      <CardHeader>
        <CardTitle className='tracking-wide whitespace-break-spaces'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className=' flex justify-center items-center gap-4'>
        <p className='text-primary/70 outline outline-1 p-2 px-4 rounded-lg outline-primary/30 truncate  text-sm'>{getShareURL(quizId)}</p>
        <Button size='icon' onClick={() => copyQuizId(quizId!)}>
          <ClipboardCopyIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizDetails;
