import { config } from '../../config';

export const texts = {
    schedule_remove_users: ` 🔄 node schedule - Tarefa agendada: Remoção de usuários inativos `,
    localhost: `http://localhost:${config.port}`,
    start_server: `
    ========================================
      🚀 Aplicativo em execução com sucesso!
    ========================================
      🌐 Acesse em: ${`http://localhost:${config.port}`}
    `,
};
