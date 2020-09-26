export function signIn() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: '2o37irulhqweiufli',
                user: {
                    name: 'Davi',
                    email: 'davigiordano@gmail.com',
                },
            });
        },  2000);
    });
}