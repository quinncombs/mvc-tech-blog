const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


//retrieve existing posts and display data.
router.get('/', (req, res) => {
    Post.findAll({
        attributes: 
        [
            'id',
            'title',
            'createdAt',
            'content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            },
            {
                model: User,
                attributes: ['username', 'github']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }    
    res.render('signup');
});


module.exports = router;