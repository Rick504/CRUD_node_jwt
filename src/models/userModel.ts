import db from '../../config/config_pg';
import { IUser,IUserResultUpdate, IUpdateUserResponse } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { config } from '../../config';

function hashPassword(password: string) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

export function getUserByEmail(email: string) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      throw new Error(`Erro ao autenticar usuário: ${err.message}`);
    });
}

export function authUserLogin(user: IUser) {
  const { email, password } = user;
  const query = `SELECT * FROM users WHERE email = $1 AND password = $2;`;
  const values = [email, password];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      throw new Error(`Erro ao autenticar usuário: ${err.message}`);
    });
}

export function getUserById(id: string) {
  const query = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error('Erro ao buscar usuário por ID:', err);
      throw err;
    });
}

export function getTableData(table: string): Promise<Object[]> {
  return db
    .query(`SELECT * FROM ${table}`)
    .then((res) => res.rows)

    .catch((err) => {
      console.error(`Erro ao buscar usuários na tabela ${table}:`, err);
      throw err;
    });
}

export async function insertUser(user: IUser) {
  const id = uuidv4();
  const auth_status = true
  const { name, email, password } = user;
  const _hashPassword = await hashPassword(password)
  const query = `
    INSERT INTO users (id, name, email, password, auth_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [id, name, email, _hashPassword, auth_status];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error('Erro ao inserir usuário:', err);
      throw err;
    });
}

async function insertUserTableUserHistorys(table: string, user: IUserResultUpdate, ipAddress: string) {
  const idTable = uuidv4();
  const { id, name, email } = user;

  const query = `
    INSERT INTO ${table} (id, user_id, name, email, ip_address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [idTable, id, name, email, ipAddress];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error('Erro ao inserir usuário:', err);
      throw err;
    });
}

export async function updateUser(user: IUser, id: string, ipAddress: string): Promise<IUpdateUserResponse> {
  const { name, email, password } = user;
  const _hashPassword = await hashPassword(password)

  try {
    const userExistsQuery = `
      SELECT id
      FROM users
      WHERE id = $1;
    `;
    const userExistsResult = await db.query(userExistsQuery, [id]);

    if (userExistsResult.rowCount === 0) {
      return {
        success: false,
        message: 'Usuário não encontrado.',
      };
    }

    const updateQuery = `
      UPDATE users
      SET
        name = $1,
        email = $2,
        password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, name, email;
    `;

    const values = [name, email, _hashPassword, id];
    const { rows } = await db.query(updateQuery, values);
    const result = rows[0]

    await insertUserTableUserHistorys('users_history_update', result, ipAddress)

    return {
      success: true,
      data: result,
      message: 'Usuário atualizado com sucesso.',
    };

  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    throw new Error('Erro interno ao tentar atualizar o usuário.');
  }
}


export async function softDeleteUser(id: string, ipAddress: string): Promise<IUpdateUserResponse> {
  const updateQuery = `
    UPDATE users
    SET
      deleted_at = NOW(),
      auth_status = false
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  try {
    const { rows } = await db.query(updateQuery, [id]);
    const result = rows[0]

    await insertUserTableUserHistorys('users_history_delete', result, ipAddress)

    if (result.rowCount === 0) {
      return {
        success: false,
        message: 'O id informado não existe ou o usuário já está marcado para exclusão.',
      };
    }

    return {
      success: true,
      message: 'Usuário marcado para exclusão com sucesso.',
    };
  } catch (err) {
    console.error('Erro ao marcar usuário para exclusão:', err);
    throw new Error('Erro interno ao tentar marcar o usuário para exclusão.');
  }
}

export async function permanentlyDeleteUsers(): Promise<void> {
  const interval =  config.testMode ? '2 minutes' : '30 days';
  const deleteQuery = `
    DELETE FROM users
    WHERE deleted_at IS NOT NULL AND deleted_at <= NOW() - INTERVAL '${interval}';
  `;
  try {
    const result = await db.query(deleteQuery);
    console.log(`[SERVICE] Usuários removidos definitivamente: ${result.rowCount}`);
  } catch (err) {
    console.error('[SERVICE] Erro ao remover usuários definitivamente:', err);
  }
}

