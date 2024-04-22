export interface Project {
  id?: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface CreatedProject {
  id: string;
  name: string;
  description?: string;
}
export interface ProjectBatch {
  content: Project[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
