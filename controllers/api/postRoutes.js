const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


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
    Post.findOne ({
         attributes: { exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
         {
         model: Post,
         attributes: ['id', 'title', 'postContent', 'createdAt']
         },
         {
         model: Comment,
         attributes: ['id', 'commentText', 'createdAt'],
         include: {
         model: Post,
         attributes: ['title']
         }
        }
]
})
.then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;