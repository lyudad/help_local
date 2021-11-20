export interface IJobBidQuery {
  job_post_id: number
  requested_amount: number
  materials_cost?: number
  attachment_ids?: string[]
  screeningQuestionsAnswers?: IScreeningQuestionsAnswer[]
}

export interface IUpdateJobBidBody {
  id: number
  requestedAmount?: number
  materialsCost?: number
  attachmentIds?: string[]
  screeningQuestionsAnswers?: IScreeningQuestionsAnswer[]
}

export interface IScreeningQuestionsAnswer {
  questionId: number
  answer: string
}

export enum AdditionalHeaderTypes {
  ACCEPTED_BID = 'accepted bid',
  PREVIOUS_BID = 'previous bid ',
}
