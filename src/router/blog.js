const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const pageIndex = req.query.pageIndex || 1
    const pageSize = req.query.pageSize || 10
    const keyword = req.query.keyword || ''
    const userId = req.query.userId || ''
    const id = req.query.id || ''

    if(req.method === 'GET' && req.path === '/api/blog/getList'){
        return getList(pageIndex, pageSize, keyword, userId).then(result => {
            return new SuccessModel(result)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }

    if(req.method === 'GET' && req.path === '/api/blog/getDetail'){
        return getDetail(id).then(result => {
            return new SuccessModel(result)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
}

module.exports = handleBlogRouter