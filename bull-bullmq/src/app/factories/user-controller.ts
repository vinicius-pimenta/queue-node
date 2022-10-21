import { makeBullmq } from "./index"
import { UserController } from "../controllers"

export function makeUserController() {
  const queueProvider = makeBullmq()
  const userController = new UserController(queueProvider)

  return userController
}