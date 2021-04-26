import { IUser } from "../models/user.interface";

export function _mapUser(obj:IUser): any {
  return {
    ...obj,
    userFullDescription: `${obj.name} ${obj.lastname}`
  }
}

export function _mapPackageType(obj:any): any {
  return {
    name: `${obj}`,
    quantity: 0
  }
}