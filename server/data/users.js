import bcrypt from 'bcrypt';

const users = [
    {
        name:"Admin User",
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:"John Cena",
        email:'johncena@email.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:"Randy Orton",
        email:'randy@email.com',
        password:bcrypt.hashSync('123456',10),
    },
]

export default users;