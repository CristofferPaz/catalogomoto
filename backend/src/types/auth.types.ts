export type AuthUser = {
  identificador: number;
  usuario: string;
};

export type JwtPayload = AuthUser & {
  iat?: number;
  exp?: number;
};
