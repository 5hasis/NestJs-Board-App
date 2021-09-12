import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board) //Board를 컨트롤하는 repository임을 선언
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto, user:User): Promise <Board> {
        
        //const title = createBoardDto.title;
        const {title,description} = createBoardDto;

        const board = this.create({
            title,
            description, // : 안해줘도 두개 이름 똑같으면 지워줘도 댐
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);
        return board;
    }

    //async deleteBoard
}