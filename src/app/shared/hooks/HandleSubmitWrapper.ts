import { useCallback } from "react";

const useHandleSubmitWrapper = (
  handleSubmit: (event: React.FormEvent, onClose: () => void) => void,
  onClose: () => void
) => {
  const handleSubmitWrapper = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      handleSubmit(event, onClose);
      onClose();
    },
    [handleSubmit, onClose]
  );

  return { handleSubmitWrapper };
};

export default useHandleSubmitWrapper;
