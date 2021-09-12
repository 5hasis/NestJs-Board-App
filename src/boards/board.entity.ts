import { User } from "src/auth/user.entity";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { BoardStatus } from './board-status.enum';

@Entity() //테이블로 변환
export class Board extends BaseEntity {

    @PrimaryGeneratedColumn()
    id :  number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    status : BoardStatus;

    @ManyToOne(type => User, user => user.boards, { eager:false })
    user:User;

}