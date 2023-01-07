export interface IGameNode {
  name: string;
  children: IGameNode[];
  parent: IGameNode | null;
}
