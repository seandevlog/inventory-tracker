import bcrypt from 'bcrypt';

const hash = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); 

    return hashedPassword;
}

const compare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
} 

export default {
    hash,
    compare
}