import { texts } from '../utils/textLogs';
import { scheduleDeleteUsersJob } from './deleteUsers.job';

export function initializeJobs() {
  console.log(texts.schedule_remove_users);
  scheduleDeleteUsersJob();
}
