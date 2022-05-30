export interface RequestModel {
  name: string;
  requests?: RequestModel[];
  uuid?: string;
  processTime?: number;
}
