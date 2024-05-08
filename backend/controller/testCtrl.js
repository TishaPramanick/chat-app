const Test = require("../model/testModel");

function add(fname , lname)
{
    let test1 = new Test({
        firstName : fname,
        lastName : lname
    });

    test1.save();
    console.log("Test Added")
}

function addFullName(){
    let test = new Test();
    test.fullName = "Vijay Gupta";

    console.log(test.toJSON());
}

function profile()
{
    let test = new Test({
        firstName : "Tisha",
        lastName : "Pramanick"
    });
    let pic = test.setDefaultProfilePic();
    console.log(pic);
}

function getAll()
{
    Test.getAllUsers().then((d) => console.log(d)).catch((e)=>console.log(e));
}

module.exports = {add , addFullName , profile , getAll};