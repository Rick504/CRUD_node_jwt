import { scheduleDeleteUsersJob } from './deleteUsers.job';

export function initializeJobs() {
  console.log(` 🔄 node schedule - Tarefa agendada: Remoção de usuários inativos `);
  scheduleDeleteUsersJob();
}
