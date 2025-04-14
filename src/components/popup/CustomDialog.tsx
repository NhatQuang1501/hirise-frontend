import { CustomDialogProps } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CustomDialog({
  open,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmButtonClassName,
}: CustomDialogProps) {
  // Thêm xử lý cleanup khi dialog đóng
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Đảm bảo focus và overlay được reset
      setTimeout(() => {
        onClose();
      }, 0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleOpenChange(false);
        }}
        onEscapeKeyDown={() => handleOpenChange(false)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            {cancelText}
          </Button>
          <Button
            type="button"
            className={cn(confirmButtonClassName)}
            onClick={() => {
              onConfirm();
              handleOpenChange(false);
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
