const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// get all posts
router.get('/', (req, res) => {
    Post.findAll({ 
        attributes: ['id', 'title', 'postText', 'createdAt'],
        order: ['createdAt', 'DESC'],
        include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })

    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// finds one post based on id
router.get('/:id', (req, res) => {
    Post.findOne {

    }
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})