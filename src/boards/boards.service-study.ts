import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; //v1: version
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];
    
    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        
        //const title = createBoardDto.title;
        const {title,description} = createBoardDto;

        const board: Board = {
            id : uuid(),
            title : title,
            description, // : 안해줘도 두개 이름 똑같으면 지워줘도 댐
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    //Id로 게시물 찾기
    getBoardById(id:string):Board {
        //boards배열에서 1개 찾음
        //board 하나가져오고 board.id랑 파라미터 id랑 같은지
        const found = this.boards.find((board) => board.id === id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    //Id로 특정 게시물 삭제하기
    deleteBoard(id:string) :void {
        //Id가 같지 않은거는 필터로 걸러지고 
        //Id가 같은것은 지워짐
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id:string, status:BoardStatus):Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
