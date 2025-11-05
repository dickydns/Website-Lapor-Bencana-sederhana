import { atomWithStorage } from "jotai/utils";


export type User ={id:number, status:string, role:string} | null;
export const userAtom = atomWithStorage<User>('session:user', null);