import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { usersRepositories } from '../repositories/usersRepositories'

interface IUserRequest {
  name: string,
  email: string,
  password: string,
  admin?: boolean
}

class createUserService {

  async execute({ name, email, admin = false, password } : IUserRequest){
    const usersRepository = getCustomRepository(usersRepositories)

    if(!email)
      throw new Error("you need type your email")

    const userAlreadyExists = await usersRepository.findOne({ email })

    if(userAlreadyExists){
      throw new Error(`User ${userAlreadyExists.email} already exists`)
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    })

    await usersRepository.save(user)

    return user
  }
}

export { createUserService } 