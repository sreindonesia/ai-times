export interface LoginSuccessResponse {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "User";
}