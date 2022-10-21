import { Bull } from "../lib/bull"

export function makeBull() {
  const bull = new Bull()

  return bull
}