const login = (username, password) => {
    if(username === 'harris' && password === '123456'){
        return true
    }
    return false
}

const checkLogin = (username, password) => {
    if(username === 'harris' && password === '123456'){
        return true
    }
    return false
}

module.exports = {
    login,
    checkLogin
}