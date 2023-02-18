// import userRepository from "../../repositories/users-reposity"

type user = {
    email: string,
    senha: string
}

async function createuser(user: user) {
//   const emailVerify = await userRepository.findUserByEmail(user.email);

//   if(emailVerify) {
//     throw {};
//   }

return "toma: "+user.email

};

const usersService = {
    createuser
};

export default usersService;
