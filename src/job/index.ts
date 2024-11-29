import { scheduleDeleteUsersJob } from './deleteUsers.job';

export function initializeJobs() {
  console.log('Iniciando tarefas agendadas com node schedule...');
  scheduleDeleteUsersJob();
}
