import { Date, Schema } from 'mongoose';
import { dbserver } from '../libs/db.connect';

/**
 * Interface que representa a estrutura de um documento de usuário no MongoDB.
 */
export interface IUser {
  /** Identificador do usuário gerado pelo MongoDB */
  _id: Schema.Types.ObjectId;

  /** Indica se o usuário está ativo */
  status: boolean;

  /** Nome completo do usuário */
  name: string;

  /** E-mail do usuário */
  email: string;

  /** Senha criptografada do usuário */
  password: string;

  /** Data de criação do documento */
  createdAt: Date;

  /** Data da última atualização do documento */
  updatedAt: Date;

  /** Data da exclusão lógica, se aplicável */
  deletedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    status: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

/**
 * Modelo Mongoose para manipulação da coleção `User` no banco de dados.
 */
const UserModel = dbserver.model<IUser>('User', userSchema);

export default UserModel;
