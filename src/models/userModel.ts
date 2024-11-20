import db from '../../config/config_pg';
import { IUser } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

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

export function getUsers(): Promise<Object[]> {
  return db
    .query('SELECT * FROM users')
    .then((res) => res.rows)
    .catch((err) => {
      console.error('Erro ao buscar usuários:', err);
      throw err;
    });
}

export async function insertUser(user: IUser) {
  const id = uuidv4();
  const { name, email, password } = user;
  const hashPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (id, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [id, name, email, hashPassword];

  return db
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error('Erro ao inserir usuário:', err);
      throw err;
    });
}

export async function updateUser(user: IUser, id: string): Promise<{ success: boolean; data?: IUser; message: string }> {
  const { name, email, password } = user;
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
    const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateQuery = `
      UPDATE users
      SET
        name = $1,
        email = $2,
        password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, name, email;
    `;

    const values = [name, email, hashPassword, id];
    const updateResult = await db.query(updateQuery, values);

    return {
      success: true,
      data: updateResult.rows[0],
      message: 'Usuário atualizado com sucesso.',
    };

  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    throw new Error('Erro interno ao tentar atualizar o usuário.');
  }
}


export async function deleteUser(id: string): Promise<{ success: boolean; message: string }> {
  const deleteQuery = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const deleteResult = await db.query(deleteQuery, [id]);

    if (deleteResult.rowCount === 0) {
      return {
        success: false,
        message: 'O id informado não existe no banco.',
      };
    }
    return {
      success: true,
      message: 'Usuário deletado com sucesso.',
    };
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    throw new Error('Erro interno ao tentar deletar o usuário.');
  }
}

