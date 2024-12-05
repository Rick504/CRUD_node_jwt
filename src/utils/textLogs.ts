import { config } from '../../config';

export const texts = {
    localhost: `http://localhost:${config.port}`,
    startServer: `
    ========================================
      🚀 Aplicativo em execução com sucesso!
    ========================================
      🌐 Acesse em: ${`http://localhost:${config.port}`}
    `,
};
