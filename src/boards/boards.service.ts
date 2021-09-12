import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; //v1: version
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    
}
