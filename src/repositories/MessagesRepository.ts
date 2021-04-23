import { Repository } from "typeorm";
import { Message } from "../entities/Message";

class MessageRepository extends Repository<Message>{}

export { MessageRepository };