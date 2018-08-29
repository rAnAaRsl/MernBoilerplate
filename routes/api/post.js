const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load Model

const Post = require('../../model/Post');
const Profile = require('../../model/Profile');

// Load validator

const validatePostInput = require('../../validation/post');


// @route  Get api/users/test
// @desc   Test post route
// @access Public


router.get('/test', (req, res) => res.json({msg: "posts works"}));


// @route  Get api/posts
// @desc   Get Posts
// @access Public

router.get('/', (req, res) => {

    Post.find().sort({date: -1}).then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostFound: "No Posts Found"}));
});

// @route  Get api/posts/:id
// @desc   Get Post by id
// @access Public

router.get('/:id', (req, res) => {

    Post.findById(req.params.id).then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostFound: "No Post Found with that id"}));
});


// @route  Post api/posts
// @desc   Create Post
// @access Private


router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check  Validation

    if (!isValid) {
        // Return any errors with 400 errors

        return res.status(400).json(errors);

    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post)).catch(err => res.json(err));
});

// @route  Delete Post api/posts/:id
// @desc   Delete Post
// @access Private

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            // Check Post Owner
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: "User not authorized"});
            }

            // Delete

            post.remove().then(() => {
                res.json({success: true})
            }).catch(err => {
                res.status(404).json({postnotFound: "No Post Found"});
            })
        })
    })
});

// @route  Post api/posts/like/:id
// @desc   like Post
// @access Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked: "User already Liked this Post"});
            }

            // Add user id to like array

            post.likes.unshift({user: req.user.id});

            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({postnotFound: "No Post Fund"}));
    })
});


// @route  Post api/posts/unlike/:id
// @desc   Unlike Post
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({notLiked: "You have not Liked this Post"});
            }

            // Get remove Index

            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

            // Splice out of array

            post.likes.splice(removeIndex, 1);

            // Save

            post.save().then(post => res.json(post));

        }).catch(err => res.status(404).json({postnotFound: "No Post Fund"}));
    })
});


// @route  Post api/posts/comment/:id
// @desc   Add Comment to Post
// @access Private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check  Validation

    if (!isValid) {
        // Return any errors with 400 errors

        return res.status(400).json(errors);

    }
    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // Add Comment to array

        post.comments.unshift(newComment);

        // Save

        post.save().then(post => res.json(post))
    }).catch(err => res.status(404).json({postnotFound: "No Post Fund"}));

});


// @route  Delete Comment api/posts/comment/:comment_id
// @desc   Delete Comment to Post
// @access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.id).then(post => {
        // Check if comment exists
        if(post.comments.filter(comment=> comment._id.toString()===req.params.comment_id).length ===0){
            return res.status(404).json({commentnotexists:"Comment does not exist "})
        }

        // Get remove index

        const removeIndex = post.comments.map(item=> item._id.toString()).indexOf(req.params.comment_id);

        // Splice Comment out of arrray

        post.comments.splice(removeIndex,1);

        post.save().then(post=> res.json(post)).catch(err => res.status(404).json({postnotFound: "No Post Fund"}));

    }).catch(err => res.status(404).json({postnotFound: "No Post Fund"}));

});


module.exports = router;
