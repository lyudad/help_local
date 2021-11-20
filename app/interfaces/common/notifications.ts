import { ICategory } from './category'
import { EHelperOrClient, IFirstLastNamesAndAvatar } from './other'
import { ICheckoutPreview } from './payment'

export interface INotificationSetting {
  id: number
  type: EHelperOrClient
  title: string
  event: string
  email: boolean
  push: boolean
}

export interface INotification {
  id: number
  type: EUserNotificationTypes
  isRead: boolean
  createdAt: string
  jobPostId: number
  createdBy: IFirstLastNamesAndAvatar & {
    id: string
  }
  jobPostInfo: {
    id: number
    title: string
    category: ICategory
  }
  jobBidId?: number
  feedbackInfo?: {
    id: number
    score: number
    userId: string
    categoryId: number
    jobPostId: number
    description: string
    createdBy: string
    createdAt: string
  }
  charges?: ICheckoutPreview
}

export enum EUserNotificationTypes {
  ON_BID_ON_JOB_POST = 'bid_on_job_post',
  ON_USER_GET_HIRED = 'user_get_hired',
  ON_INVITE_TO_JOB_POST = 'invite_to_job_post',
  ON_JOB_POST_UPDATED = 'job_post_info_updated',
  ON_JOB_POST_DELETED = 'job_post_deleted',
  ON_JOB_BID_DELETED = 'user_job_bid_deleted',
  ON_JOB_BID_MARKED_COMPLETED = 'job_bid_marked_completed',
  ON_JOB_POST_OVERDUE = 'on_job_post_overdue',
  ON_HELPER_ARRIVED = 'on_helper_arrived',
  ON_HELPER_STARTED_TRACKER = 'on_helper_started_tracker',
  ON_BACKGROUND_CHECK_SUCCESS = 'background_check_success',
  ON_BACKGROUND_CHECK_FAILED = 'background_check_failed',
  ON_MESSAGE_PUBLISHED = 'message_published',
  ON_JOB_POST_COMPLETED = 'on_job_completed',
  ON_RELEVANT_JOB_POSTED = 'new_job_post',
  ON_HELPER_LEFT_REVIEW = 'helper_left_review',
  ON_CLIENT_LEFT_REVIEW = 'client_left_review',
  ON_HELPER_PROFILE_COMPLETED = 'helper_profile_completed',
  ON_JOB_POST_CREATED = 'job_post_created',
  ON_JOB_POST_CREATED_AND_HELPERS_INVITED = 'job_post_created_and_helpers_invited',
  ON_JOB_POST_UPDATED_SUCCESSFULLY = 'on_job_post_updated',
}
