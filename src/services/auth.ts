interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> { //equivalente a dar um axios.get
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: '2o37irulhqweiufli',
                user: {
                    name: 'Davi',
                    email: 'davigiordano@gmail.com',
                },
            });
        },  1000);
    });
}