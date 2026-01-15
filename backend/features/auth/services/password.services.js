import bcrypt from 'bcrypt';

const hash = async (password) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt); 

        return hashedPassword;
    } catch (err) {
        throw err;
    }
}

const compare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export default {
    hash,
    compare
}