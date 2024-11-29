import schedule from 'node-schedule';
import { permanentlyDeleteUsers } from '../models/userModel';

export function scheduleDeleteUsersJob() {
  const isTestMode = process.env.TEST_MODE === 'true';

  // Define o horário com base no modo as 15:45 ou 02:00
  const scheduleTime = isTestMode ? '45 15 * * *' : '0 2 * * *';

  schedule.scheduleJob(scheduleTime, async () => {
    console.log(`[JOB] Iniciando exclusão definitiva de usuários (${isTestMode ? 'TEST' : 'PROD'}):`, new Date());
    try {
      await permanentlyDeleteUsers();
      console.log('[JOB] Exclusão concluída com sucesso:', new Date());
    } catch (error) {
      console.error('[JOB] Erro durante a exclusão de usuários:', error);
    }
  });
}
