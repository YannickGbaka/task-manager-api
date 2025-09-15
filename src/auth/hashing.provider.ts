export abstract class HashingProvider {
  abstract hashPassword(password: string | Buffer): Promise<string>;
  abstract comparePassword(plain: string, hashed: string): Promise<boolean>;
}
