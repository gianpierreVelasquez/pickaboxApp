import { IUser } from "../models/user.interface";

export function _mapUser(obj:IUser): any {
  return {
    ...obj,
    userFullDescription: `${obj.name} ${obj.lastname} - ${obj.code}`
  }
}