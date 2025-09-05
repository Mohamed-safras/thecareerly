import { putFile, removeFile } from "@/lib/common/uploadsvault";
import { useAppDispatch } from "@/store/hooks";

import {
  setForm as setFormMerge,
  setLogoPreview as setLogoPreviewAction,
} from "@/features/jobs/jobs-slice";

const useFileHandler = (fileId?: string | null) => {
  const dispatch = useAppDispatch();

  function handleFileChange(file?: File | null) {
    const f = file ?? null;
    if (f) {
      const id = putFile(f); // keep File out of Redux
      const url = URL.createObjectURL(f); // preview url
      dispatch(setFormMerge({ logoFileId: id }));
      dispatch(setLogoPreviewAction(url));
    } else {
      removeFile(fileId);
      dispatch(setFormMerge({ logoFileId: null }));
      dispatch(setLogoPreviewAction(null));
    }
  }

  return { handleFileChange };
};

export default useFileHandler;
