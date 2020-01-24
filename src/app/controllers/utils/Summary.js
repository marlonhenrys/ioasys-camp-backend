module.exports = async (request, response) => {

    return response.status(200).json({

        project: 'ioasys CAMP 2020',
        theme: 'Education',

        entities: {
            user: {
                student: {
                    type: 'ObjectId',
                    ref: 'Student',
                },
                email: {
                    type: 'String',
                    required: true,
                },
                password: {
                    type: 'String',
                    required: true,
                }
            },
            student: {
                name: {
                    type: 'String',
                    required: true,
                },
                course: {
                    type: 'ObjectId',
                    ref: 'Course',
                    required: true,
                },
                gender: {
                    type: 'String',
                    required: true,
                },
                birthdate: {
                    type: 'String',
                    required: true,
                }
            },
            course: {
                name: {
                    type: 'String',
                    required: true,
                },
                coursetype: {
                    type: 'String',
                    required: true,
                },
                campus: {
                    type: 'String',
                    required: true,
                }
            },
            subject: {
                course: {
                    type: 'ObjectId',
                    ref: 'Course',
                    required: true,
                },
                turn: {
                    type: 'String',
                    required: true,
                },
                name: {
                    type: 'String',
                    required: true,
                }
            }
        },

        routes: {
            publics: {
                register: {
                    path: '/register',
                    method: 'POST'
                },
                login: {
                    path: '/login',
                    method: 'POST'
                }
            },
            privates: {
                students: {
                    list: { path: '/students', method: 'GET' },
                    show: { path: '/students/:id', method: 'GET' },
                    update: { path: '/students', method: 'PUT' },
                    delete: { path: '/students', method: 'DELETE' },
                }
            }
        }
    })
};