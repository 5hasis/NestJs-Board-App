export interface Board {
    id : string;
    title : string;
    description : string;
    status :  BoardStatus; //게시물이 공개 상태
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}