import type {Question} from './question';

export interface Session {
  id: string;
  userId: string;
  targetRole: string;
  lifecycleStatus: 'ACTIVE' | 'ARCHIVED';
  setupStatus: 'CREATED' | 'INITIALIZING' | 'READY';
  experience: number;
  topicsToFocus: string;
  description: string;
  questionCount: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export type FieldTypeSessionCreateForm = {
  targetRole: string;
  experience: number;
  topicsToFocus: string;
  description: string;
};

export interface UpdateSessionDto {
  lifecycleStatus?: 'ACTIVE' | 'ARCHIVED';
  setupStatus?: 'CREATED' | 'INITIALIZING' | 'READY';
  targetRole?: string;
  experience?: number;
  topicsToFocus?: string;
  description?: string;
}
