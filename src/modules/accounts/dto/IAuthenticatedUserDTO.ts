export default interface IAuthenticatedUserDTO {
  name: string;
  email: string;
  token: string;
  refresh_token: string;
}
