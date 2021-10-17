const userModel = require('../models/user')
const newsModel = require('../models/news')
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res, next) {
        const { email, password } = req.body
        // Validate request 
        if (!email || !password) {
            req.flash('error', 'All fields are required')
            return res.redirect('/login')
        }
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                req.flash('error', info.message)
                return next(err)
            }
            if (!user) {
                req.flash('error', info.message)
            }
            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
            })
        })(req, res, next)
    },
    async register(req, res) {
        const { email, password } = req.body
        // Validate request 
        if (!email || !password) {
            req.flash('error', 'All fields are required')
            req.flash('email', email)
        }

        // Check if email exists 
        userModel.exists({ email: email }, (err, result) => {
            if (result) {
                req.flash('error', 'Email already taken')
                req.flash('name', name)
                req.flash('email', email)
            }
        })

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10)
        // Create a user 
        const user = new userModel({
            email,
            password: hashedPassword
        })

        userModel.save().then((user) => {
            // Login
            return `User has been added with email - ${user.email}`
        }).catch(err => {
            req.flash('error', 'Something went wrong')
        })
    },
    async addComment(req, res) {
        const { description, newsId } = req.body
        const id = req.params.id
        const userObj = userModel.findById(id)
        if (!userObj) {
            req.flash('error', 'User does not exist')
        }
        // Validate request 
        if (!description || !newsId) {
            req.flash('error', 'Description and newsId should not be empty')
        }
        await newsModel.findOneAndUpdate(
            { _id: person._id },
        )
        // Add comment on news
        await PersonModel.update(
            { _id: newId },
            { $push: { comments: { userId: id, description } } }
        );
    },
    async addComment(req, res) {
        const { description, newsId } = req.body
        const id = req.params.id
        const userObj = userModel.findById(id)
        if (!userObj) {
            req.flash('error', 'User does not exist')
        }
        // Validate request 
        if (!description || !newsId) {
            req.flash('error', 'Description and newsId should not be empty')
        }
        // Add Comment
        await newsModel.findOneAndUpdate(
            { _id: newsId, userId: id },
            { $push: { comments: { userId: id, description } } }
        )
    },
    async editComment(req, res) {
        const { description, newsId, commentId } = req.body
        const id = req.params.id
        const userObj = userModel.findById(id)
        if (!userObj) {
            req.flash('error', 'User does not exist')
        }
        // Validate request 
        if (!description || !newsId || !commentId) {
            req.flash('error', 'Description, newsId, and commentId should not be empty')
        }
        // Check if email exists 
        const newsObj = newsModel.exists({
            $and: [
                { userId: id },
                { 'comments.userId': id, 'comments._id': commentId }
            ],
        })
        if (!newsObj) {
            req.flash('error', 'Comment is read only mode')
        }
        const newsObj = await newsModel.findOne({ _id: person._id })
        await Promise.all(newsObj.comments.map(oneComment => {
            if (oneComment._id === commentId && userId === id) {
                oneComment.description = description
            }
            return oneComment
        }))
        await newsObj.save()
    },
}