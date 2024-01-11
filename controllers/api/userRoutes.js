const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', req, res => {
    User.findAll({
        attributes: { exclude: ['password' ]}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err)
    });
});

