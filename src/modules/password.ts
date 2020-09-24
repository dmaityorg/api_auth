
import bcrypt from 'bcrypt';

const GET_SALT = 10;

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, GET_SALT);
export const comparePasswords = async (TextPassword: string, hash: string) => bcrypt.compare(TextPassword, hash);