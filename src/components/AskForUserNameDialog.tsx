import { FC, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AskForUserNameDialogProps {
  isOpen: boolean;
  onName: (_: string) => void;
}

const AskForUserNameDialog: FC<AskForUserNameDialogProps> = ({ isOpen, onName }) => {
  const [name, setName] = useState("");
  function submitHandler() {
    if (name && name.trim().length >= 5) {
      onName(name);
    }
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter you name</DialogTitle>
          <DialogDescription>This name will identify you for the admin of the quiz</DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder='Ovais Ahmad Khanday' value={name} onChange={(e) => setName(e.target.value)} required minLength={5} />
          <DialogDescription>Name should be at least 5 characters long</DialogDescription>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={submitHandler}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AskForUserNameDialog;
