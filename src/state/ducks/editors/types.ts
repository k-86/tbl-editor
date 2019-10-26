import { types as RepoTypes } from "../repositories";

export interface EditorState {
  selectedTBL: RepoTypes.TBL;
  editData: string;
}
