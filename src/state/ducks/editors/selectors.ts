import { EditorState } from "./types";

const isCurrentDataChanged = (editors: EditorState): boolean => {
  const { selectedTBL, editData } = editors;

  if (!selectedTBL.id) return false;

  return editData !== selectedTBL.data;
};

export default {
  isCurrentDataChanged
};
