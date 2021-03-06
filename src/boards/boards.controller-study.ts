import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service-study';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // createBoard(
    //     @Body('title') title:string, 
    //     @Body('description') description:string
    // ): Board {
    //     return this.boardsService.createBoard(title,description)
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto)
    }

    //localhost:5000?id=ohasis
    //파라미터가 여러개일때
    //localhost:5000?id=ohasis&title=hello
    //@Param() params: string[]
    @Get('/:id')
    getBoardById(@Param('id') id:string) : Board{
        return this.boardsService.getBoardById(id)
    }

    @Delete(':id')
    deleteBoard(@Param('id') id:string) : void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:string,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
