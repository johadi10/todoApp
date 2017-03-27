/**
 * Created by ILYASANATE on 26/03/2017.
 */
const {ObjectID}=require('mongodb');
const {Todo}=require('./../../models/todo');
const {User}=require('./../../models/user');
const jwt=require('jsonwebtoken');

const todos=[{_id: new ObjectID,text: "todo text one"},
    {_id: new ObjectID,text: 'todo text two',completed: true,completedAt: 1234}];
var userOneId=new ObjectID();
var userTwoId=new ObjectID();
const users=[{
    _id: userOneId,
    email: 'ovenje@gmail.com',
    password: '123123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId,access: 'auth'},'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'jimoh@gmail.com',
    password: '112233'
}];
const populateTodos=(done)=>{
    Todo.remove({})
        .then(()=>{
            return Todo.insertMany(todos);
        }).then(()=>done());
}
const populateUsers=(done)=>{
    User.remove({})
        .then(()=>{
            var userOne=new User(users[0]).save();
            var userTwo=new User(users[1]).save();

            return Promise.all([userOne,userTwo]);
        }).then(()=>done());
}

module.exports={todos,populateTodos,users,populateUsers};