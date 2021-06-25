import { Request, Response } from 'express'
import { createComplimentsService } from '../services/createComplimentsService'


class createComplimentsController{

  async handle(request: Request, response: Response){
    const { tag_id, user_sender, user_receiver, message } = request.body

    const complimentService = new createComplimentsService()

    const compliment = await complimentService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    return response.json(compliment)

  }
}

export { createComplimentsController }