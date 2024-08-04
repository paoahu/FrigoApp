//import { validate, errors } from '../../com/index.js';
import { API_URL } from '@env';
//const { SystemError } = errors


async function checkUser(userId) {
    //validate.id(userId, 'user id');

    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, req);
        if (!response.ok) {
            const body = await response.json();
            throw new errors[body.error](body.message);
        }
        const user = await response.json();
        return user.name;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default checkUser;