import type {FieldTypeSessionCreateForm, Session, UpdateSessionDto} from '@/shared/types/session';
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithMiddleware} from './baseQuery';
import type {ApiDataResponse, ApiListDataResponse, ApiMessageResponse} from '@/shared/types/api';
import type {SessionStatus} from '../slices/dashboardPageSlice';
import env from '@/configs/env';
import type {Discussion} from '@/shared/types/question';

type GetRecentSessionsSuggestionsRes = ApiDataResponse<Pick<Session, 'targetRole' | 'topicsToFocus'>[]>;
type GetAllSessionsRes = ApiListDataResponse<Session[]>;
export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: baseQueryWithMiddleware,
  tagTypes: ['Session'],
  endpoints: (builder) => ({
    //
    getAllSessionsPagination: builder.query<
      Omit<GetAllSessionsRes, 'message'>,
      {page: number; limit: number; keyword?: string; status?: SessionStatus[]}
    >({
      query: ({page, limit, keyword, status}) => ({
        url: '/session/my-sessions',
        params: {page, limit, keyword, status: status?.length ? status : undefined},
      }),
      transformResponse: (res: GetAllSessionsRes) => ({
        pagination: res.pagination,
        data: res.data,
      }),
      providesTags: ['Session'],
    }),
    //
    getAllSessionsInfinite: builder.query<
      Omit<GetAllSessionsRes, 'message'>,
      {page: number; limit: number; keyword?: string; status?: SessionStatus[]}
    >({
      query: ({page, limit, keyword, status}) => ({
        url: '/session/my-sessions',
        params: {page, limit, keyword, status: status?.length ? status : undefined},
      }),
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        const {keyword, status, limit} = queryArgs;

        return {
          endpointName,
          keyword,
          status,
          limit,
        };
      },
      merge: (currentCache, newData, {arg}) => {
        if (arg.page === 1) {
          currentCache.data.length = 0;
        }
        currentCache.data.push(...newData.data);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (res: GetAllSessionsRes) => ({
        pagination: res.pagination,
        data: res.data,
      }),
      providesTags: ['Session'],
    }),
    //
    getRecentSessionsSuggestions: builder.query<Omit<GetRecentSessionsSuggestionsRes, 'message'>, void>({
      query: () => ({
        url: '/session/search-sessions-suggestions',
      }),
      transformResponse: (res: GetRecentSessionsSuggestionsRes) => ({
        data: res.data,
      }),
      extraOptions: {
        skipGlobalError: true,
      },
    }),
    //
    sessionDetail: builder.query<Session, string>({
      query: (id) => `/session/my-session/${id}`,
      transformResponse: (res: ApiDataResponse<Session>) => res.data,
      providesTags: (_result, _error, id) => [{type: 'Session', id}],
      extraOptions: {
        skipGlobalError: true,
      },
    }),
    // Create Session
    createSession: builder.mutation<ApiDataResponse<Session>, FieldTypeSessionCreateForm>({
      query: (body) => ({
        url: '/session/create-session',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Session'],
    }),
    //
    updateSession: builder.mutation<ApiDataResponse<Session>, {id: string; updateDto: UpdateSessionDto}>({
      query: ({id, updateDto}) => ({
        url: `/session/my-session/${id}`,
        method: 'PATCH',
        body: updateDto,
      }),
      invalidatesTags: (_result, _error, {id}) => [{type: 'Session', id}],
    }),
    //
    archiveSession: builder.mutation<ApiDataResponse<Session>, {id: string}>({
      query: ({id}) => ({
        url: `/session/my-session/${id}/archive`,
        method: 'PATCH',
        body: {lifecycleStatus: 'ARCHIVED'} as Pick<UpdateSessionDto, 'lifecycleStatus'>,
      }),
      invalidatesTags: ['Session'],
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    //
    unarchiveSession: builder.mutation<ApiDataResponse<Session>, {id: string}>({
      query: ({id}) => ({
        url: `/session/my-session/${id}/unarchive`,
        method: 'PATCH',
        body: {lifecycleStatus: 'ACTIVE'} as Pick<UpdateSessionDto, 'lifecycleStatus'>,
      }),
      invalidatesTags: ['Session'],
    }),
    //
    deleteSession: builder.mutation<ApiMessageResponse, {id: string}>({
      query: ({id}) => ({
        url: `/session/my-session/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, {id}) => ['Session', {type: 'Session', id}],
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    //
    deleteQuestion: builder.mutation<ApiMessageResponse, {sessionId: string; questionId: string}>({
      query: ({sessionId, questionId}) => ({
        url: `/session/${sessionId}/question/${questionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, {sessionId}) => [{type: 'Session', id: sessionId}],
    }),
    //
    updateQuestionPin: builder.mutation<ApiMessageResponse, {sessionId: string; questionId: string; isPinned: boolean}>(
      {
        query: ({sessionId, questionId, isPinned}) => ({
          url: `/session/${sessionId}/question/${questionId}/toggle-pin`,
          method: 'PATCH',
          body: {isPinned},
        }),

        async onQueryStarted({sessionId, questionId, isPinned}, {dispatch, queryFulfilled}) {
          const patchResult = dispatch(
            sessionApi.util.updateQueryData('sessionDetail', sessionId, (draft) => {
              const questions = draft.questions;
              if (!questions) return;

              const target = questions.find((q) => q.id === questionId);
              if (!target) return;

              if (isPinned) {
                questions.forEach((q) => {
                  q.isPinned = q.id === questionId;
                });
              } else {
                target.isPinned = false;
              }
              questions.sort((a, b) => {
                return Number(b.isPinned) - Number(a.isPinned);
              });
            }),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: (_r, _e, {sessionId}) => [{type: 'Session', id: sessionId}],
      },
    ),
    //
    generateExplanation: builder.mutation<ApiDataResponse<Discussion>, {sessionId: string; questionId: string}>({
      query: ({sessionId, questionId}) => ({
        url: `${env.API_BASE_URL}/ai/generate-explanation/${sessionId}/question/${questionId}`,
        method: 'POST',
      }),
      async onQueryStarted({sessionId, questionId}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          const assistantMessage = data.data;

          dispatch(
            sessionApi.util.updateQueryData('sessionDetail', sessionId, (draft) => {
              const question = draft.questions.find((q) => q.id === questionId);
              if (question) {
                question.discussion.push(assistantMessage);
              }
            }),
          );
        } catch {
          // ignore
        }
      },
    }),
    //
    answerFollowUp: builder.mutation<
      ApiDataResponse<Discussion>,
      {sessionId: string; questionId: string; userDiscussion: Discussion}
    >({
      query: ({sessionId, questionId, userDiscussion}) => ({
        url: `${env.API_BASE_URL}/ai/generate-answer-follow-up-question/${sessionId}/question/${questionId}`,
        method: 'POST',
        body: userDiscussion,
      }),

      async onQueryStarted({sessionId, questionId, userDiscussion}, {dispatch, queryFulfilled}) {
        // 1️⃣ Optimistic update: push USER message
        const patchResult = dispatch(
          sessionApi.util.updateQueryData('sessionDetail', sessionId, (draft) => {
            const question = draft.questions.find((q) => q.id === questionId);
            if (question) {
              question.discussion.push(userDiscussion);
            }
          }),
        );

        try {
          const {data} = await queryFulfilled;
          const assistantMessage = data.data;

          dispatch(
            sessionApi.util.updateQueryData('sessionDetail', sessionId, (draft) => {
              const question = draft.questions.find((q) => q.id === questionId);
              if (question) {
                question.discussion.push(assistantMessage);
              }
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllSessionsInfiniteQuery,
  useGetAllSessionsPaginationQuery,
  useGetRecentSessionsSuggestionsQuery,
  useSessionDetailQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionPinMutation,
  useGenerateExplanationMutation,
  useAnswerFollowUpMutation,
  useArchiveSessionMutation,
  useUnarchiveSessionMutation,
} = sessionApi;

export const generateQuestionsApi = (sessionId: string) => {
  return new EventSource(`${env.API_BASE_URL}/ai/generate-questions/${sessionId}`, {withCredentials: true});
};
