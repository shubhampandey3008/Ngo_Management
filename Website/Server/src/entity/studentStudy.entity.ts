export class StudentStudy{
    StudentID : number;
    Date : Date;
    Attendance : boolean;
    Topic : string;
    TeacherID : number;

    constructor(sid : number , date : Date , attendance : boolean , topic : string , tid : number )
    {
        this.StudentID = sid;
        this.Date = date;
        this.Attendance = attendance;
        this.Topic = topic;
        this.TeacherID = tid;
    }
}