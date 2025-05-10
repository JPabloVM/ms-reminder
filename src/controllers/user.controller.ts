import { NextFunction, Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import * as argon2 from 'argon2';

import { UserService } from '../services/user.service';

import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

import ValidationError from '../errors/validation.error';
import { Logger } from '../config/logger.config';
import BadRequestError from '../errors/badRequest.error';

const logger = new Logger('UserController');
const userService = new UserService();

/**
 * Controller responsável por gerenciar as rotas relacionadas aos usuários.
 * Opera como intermediário entre as requisições HTTP e os métodos de serviço.
 */
export class UserController {
  constructor() {}

  /**
   * Cria um novo usuário com os dados fornecidos no corpo da requisição.
   *
   * @param req - Objeto da requisição Express contendo os dados do usuário.
   * @param res - Objeto da resposta Express.
   * @param next - Função para passar o controle ao próximo middleware em caso de erro.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;

      const { error } = createUserSchema.validate(userData);

      if (error) {
        throw new ValidationError(error);
      }

      const hash = await argon2.hash(userData.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 14,
        timeCost: 5,
        parallelism: 1,
      });

      const created = await userService.create({ ...userData, password: hash });
      res.status(201).json({ data: created });
    } catch (error) {
      logger.error(`create error: ${error}`);
      next(error);
    }
  }

  /**
   * Retorna todos os usuários cadastrados.
   *
   * @param req - Objeto da requisição Express.
   * @param res - Objeto da resposta Express.
   * @param next - Função para passar o controle ao próximo middleware em caso de erro.
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.get();

      res.status(200).json({ data: users });
    } catch (error) {
      logger.error(`get error: ${error}`);
      next(error);
    }
  }

  /**
   * Retorna um usuário específico pelo seu ID.
   *
   * @param req - Objeto da requisição Express contendo o parâmetro `id`.
   * @param res - Objeto da resposta Express.
   * @param next - Função para passar o controle ao próximo middleware em caso de erro.
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const user = await userService.getById(id);
      res.status(200).json({ data: user });
    } catch (error) {
      logger.error(`get by id error: ${error}`);
      next(error);
    }
  }

  /**
   * Atualiza os dados de um usuário com base no ID fornecido.
   *
   * @param req - Objeto da requisição Express contendo `id` e os dados a serem atualizados.
   * @param res - Objeto da resposta Express.
   * @param next - Função para passar o controle ao próximo middleware em caso de erro.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      let userData = req.body;

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const { error } = updateUserSchema.validate(userData);

      if (error) {
        throw new ValidationError(error);
      }

      if (userData.password) {
        const hash = await argon2.hash(userData.password, {
          type: argon2.argon2id,
          memoryCost: 2 ** 14,
          timeCost: 5,
          parallelism: 1,
        });

        userData.password = hash;
      }

      const updated = await userService.update(id, userData);

      res.status(200).json({ data: updated });
    } catch (error) {
      logger.error(`update error: ${error}`);
      next(error);
    }
  }

  /**
   * Marca um usuário como inativo, registrando a data de exclusão lógica.
   *
   * @param req - Objeto da requisição Express contendo o parâmetro `id`.
   * @param res - Objeto da resposta Express.
   * @param next - Função para passar o controle ao próximo middleware em caso de erro.
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const updated = await userService.delete(id);

      res.status(200).json({ data: updated });
    } catch (error) {
      logger.error(`delete error: ${error}`);
      next(error);
    }
  }
}
