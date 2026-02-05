interface AnswerBlock {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

interface DiscussionBlock {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export type DiscussionRole = 'user' | 'assistant';

export interface Discussion {
  role: DiscussionRole;
  blocks: DiscussionBlock[];
  createdAt: string;
}

export interface Question {
  id: string;
  sessionId: string;
  question: string;
  answer: {
    blocks: AnswerBlock[];
  };
  isPinned: boolean;
  discussion: Discussion[];
}
