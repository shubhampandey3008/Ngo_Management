export class Student{
    Img : string;
    Name: string;
    StudentID : number;
    Class: number;
    MotherName: string;
    DateOfBirth: Date;
    DateOfJoining: Date;

    constructor(Img : string , name: string , studentId : number , Class: number , MotherName : string , DateOfBirth : Date , DateofJoining : Date)
    {
        this.Img = Img;
        this.Name = name;
        this.StudentID = studentId;
        this.Class = Class;
        this.MotherName = MotherName;
        this.DateOfBirth = DateOfBirth;
        this.DateOfJoining = DateofJoining;
    }
}