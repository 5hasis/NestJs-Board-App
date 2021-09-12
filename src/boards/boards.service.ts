import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; //v1: version
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}

    async getAllBoards(): Promise <Board[]>{
        return this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto): Promise <Board> {
        
        return this.boardRepository.createBoard(createBoardDto);
    }
    
    //Id로 게시물 찾기
    //typeORM에서 제공하는 findOne() 사용
    async getBoardById(id:number): Promise <Board> {

        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    //Id로 특정 게시물 삭제하기
    async deleteBoard(id:number) : Promise<void> {

        const result = await this.boardRepository.delete(id);

        if(result.affected === 0 ){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        
    }

    async updateBoardStatus(id:number, status:BoardStatus): Promise <Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    
}
