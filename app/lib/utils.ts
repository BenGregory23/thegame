import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRoomNumber() {
  const alphabet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789"
  let room = "";
  const LENGTH = 6;

  for (let i = 0; i < LENGTH; i++) {
    const index = Math.floor(Math.random() * alphabet.length);
    console.log(index)
    room += alphabet[index];
  }

  return room;
}
