import { User } from "@/app/lib/domain/models/User";
import { IUserRepository } from "@/app/lib/repositories/contracts/IUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return await this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return await this.userRepository.update(id, userData);
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    // Implementação simplificada para MVP
    const user = await this.userRepository.getByEmail(email);
    if (user && password) {
      return user;
    }
    return null;
  }
}
