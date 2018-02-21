export interface UserInterface {
  id: string,
  username: string
  person?: object,
  loginCount: number,
  enabled: boolean,
  createdOn: string,
  roles: object[]
}
