import { connection } from '../../config/db'

export async function getUser(username) {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM Users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return false;
        } else return true;
    } catch (error) {
        console.error("Ошибка при выполнении запроса ", err)
    }
}