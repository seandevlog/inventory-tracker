import bcrypt from 'bcrypt';

const hash = async (password) => {
    if (!password) throw new Error('Password is required to hash');

    const salt = await bcrypt.genSalt();
    if (!salt) throw new Error('Unable to generate salt');

    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) throw new Error('Unable to hash password'); 

    return hashedPassword;
}

const compare = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)

    return result;
}

export default {
    hash,
    compare
}