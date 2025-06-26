import bcrypt from 'bcrypt';
interface PasswordData {
    plainPassword: string;
    hashedPassword: string;
}
const generateRandomPassword = (length: number = 12): PasswordData => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password: PasswordData = {
        plainPassword: '',
        hashedPassword: ''
    };
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password.plainPassword += charset[randomIndex];
    }
    password = {
        plainPassword: password.plainPassword,
        hashedPassword: bcrypt.hashSync(password.plainPassword, 12) // Hashing the password
    };
    return password;
}
export default generateRandomPassword;