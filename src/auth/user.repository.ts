import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //typeORM에서 제공해주는 create() 메소드 사용
        const user = this.create({ username, password: hashedPassword });
        
        try {
            await this.save(user);
        } catch (error) { //이미 존재하는 아이디라면(unique)
            if(error.code === '23505') { //console.log 찍어보면 error code : 23505
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}