import schedule from 'node-schedule';
import { permanentlyDeleteUsers } from '../models/userModel';
import { config } from '../../config';

export function scheduleDeleteUsersJob() {
  // Define o horário com base no modo as 15:45 ou 02:00
  const scheduleTime = config.testMode ? '45 15 * * *' : '0 2 * * *';

  schedule.scheduleJob(scheduleTime, async () => {
    console.log(`[JOB] Iniciando exclusão definitiva de usuários (${config.testMode ? 'TEST' : 'PROD'}):`, new Date());
    try {
      await permanentlyDeleteUsers();
      console.log('[JOB] Exclusão concluída com sucesso:', new Date());
    } catch (error) {
      console.error('[JOB] Erro durante a exclusão de usuários:', error);
    }
  });
}
