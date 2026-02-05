import type {Discussion} from '@/shared/types/question';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface DetailSessionPageState {
  discussion: Discussion[];
  discussionQuestion: string;
  initialLoading: boolean;
  currentSessionId: string;
  currentQuestionId: string;
}

const initialState: DetailSessionPageState = {
  discussion: [],
  discussionQuestion: '',
  initialLoading: false,
  currentSessionId: '',
  currentQuestionId: '',
};

const detailSessionPageSlice = createSlice({
  name: 'detailSessionPage',
  initialState,
  reducers: {
    setInitialDiscussion(state, action: PayloadAction<Discussion[]>) {
      state.discussion = action.payload;
    },
    setDiscussionQuestion(state, action: PayloadAction<string>) {
      state.discussionQuestion = action.payload;
    },
    setInitialLoading(state, action: PayloadAction<boolean>) {
      state.initialLoading = action.payload;
    },
    setCurrentSessionId(state, action: PayloadAction<string>) {
      state.currentSessionId = action.payload;
    },
    setCurrentQuestionId(state, action: PayloadAction<string>) {
      state.currentQuestionId = action.payload;
    },
    addDiscussion(state, action: PayloadAction<Discussion>) {
      state.discussion.push(action.payload);
    },

    clearDiscussion(state) {
      state.discussion = [];
    },
  },
});

export const {
  setInitialDiscussion,
  addDiscussion,
  clearDiscussion,
  setDiscussionQuestion,
  setInitialLoading,
  setCurrentQuestionId,
  setCurrentSessionId,
} = detailSessionPageSlice.actions;

export default detailSessionPageSlice.reducer;
