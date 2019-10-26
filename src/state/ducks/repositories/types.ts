export interface TBL {
  readonly id: string;
  readonly name: string;
  readonly data: string;
  readonly created: number;
}

export interface RepositoryState {
  searchFileName: string;
  checkFileName: string;
  tbls: TBL[];
  historySize: number;
}
