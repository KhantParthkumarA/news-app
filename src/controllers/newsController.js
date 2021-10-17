const newsModel = require("../models/news")

module.exports = {
    async getTodayNews(req, res) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const newsList = await newsModel.find(
            { created: { $gte: today } },
            { sort: { 'createdAt': -1 } }
        )
        .populate('userId', '-password')
        .populate('comments.userId', '-password')
        .lean()
        return newsList
    },
    async addNews(req, res) {
        const reqData = req.body
        const newsObj = newsModel.create({
            title: reqData.title,
            description: reqData.description,
            userId: reqData.userId
        }).lean()
        return newsObj
    },
    async updateNews(req, res) {
        const reqData = req.body
        const id = req.params.id
        const newsObj = await newsModel.exists({ _id: id, userId: reqData.userId })
        if (!newsObj) {
            req.flash('error', 'User can read only this news')
        }
        await newsModel.findOneAndUpdate({ _id: reqData.id }, {
            title: reqData.title,
            description: reqData.description,
        }, { new: true })
    },
}