export interface UserGrpcPort {
  createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ id: string }>;
}
