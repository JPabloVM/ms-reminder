import mongoose, { Schema } from 'mongoose';
import UserModel from '../models/user.model';
import { CreateUserDTO, UpdateUserDTO } from '../types/user.types';

/**
 * Serviço responsável por executar as operações de negócio relacionadas aos usuários,
 * interagindo com o modelo Mongoose.
 */
export class UserService {
  constructor() {}

  /**
   * Cria um novo usuário no banco de dados.
   *
   * @param data - Dados do usuário conforme o DTO de criação.
   * @returns O documento criado.
   */
  async create(data: CreateUserDTO) {
    try {
      return await UserModel.create({ ...data });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca todos os usuários com base em um filtro opcional.
   *
   * @param query - Objeto de filtro Mongoose (opcional).
   * @returns Lista de usuários encontrados.
   */
  async get(query?: any) {
    try {
      return await UserModel.find({ ...query });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna um usuário específico pelo seu ID.
   *
   * @param id - Identificador do usuário.
   * @returns Documento do usuário encontrado ou `null`.
   */
  async getById(id: mongoose.Types.ObjectId) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza os dados de um usuário com base no ID.
   *
   * @param id - Identificador do usuário.
   * @param data - Dados a serem atualizados.
   * @returns Documento do usuário atualizado.
   */
  async update(id: mongoose.Types.ObjectId, data: UpdateUserDTO) {
    try {
      return await UserModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Realiza exclusão lógica do usuário (status para false + `deletedAt`).
   *
   * @param id - Identificador do usuário.
   * @returns Documento do usuário após exclusão lógica.
   */
  async delete(id: mongoose.Types.ObjectId) {
    try {
      return await UserModel.findByIdAndUpdate(id, { status: false, deletedAt: new Date() }, { new: true });
    } catch (error) {
      throw error;
    }
  }
}
