export class Student{
    Img : string;
    Name: string;
    Class: number;
    MotherName: string;
    DateOfBirth: Date;
    DateOfJoining: Date;

    constructor(Img : string , name: string , Class: number , MotherName : string , DateOfBirth : Date , DateofJoining : Date)
    {
        this.Img = Img;
        this.Name = name;
        this.Class = Class;
        this.MotherName = MotherName;
        this.DateOfBirth = DateOfBirth;
        this.DateOfJoining = DateofJoining;
    }
}