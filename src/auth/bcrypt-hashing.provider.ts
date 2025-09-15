import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt-ts';

export class BcryptHashingProvider implements HashingProvider {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
