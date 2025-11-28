"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Configure settings for manual trigger nodes.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm  text-muted-foreground">
            This node triggers the workflow when you click the "Execute
            workflow" button in the workflow editor. There are no additional
            settings to configure for this node.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
