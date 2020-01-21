module.exports = async (request, response) => {

    return response.json({

        project: 'ioasys CAMP 2020',
        theme: 'Education',
        version: 'Alpha',

        routes: {
            register: {
                path: '/register',
                method: 'POST'
            },
            login: {
                path: '/login',
                method: 'POST'
            },
            students: {
                list: { path: '/students', method: 'GET' },
                show: { path: '/students/:id', method: 'GET' },
                update: { path: '/students', method: 'PUT' },
                delete: { path: '/students', method: 'DELETE' },
            }
        }
    })
};