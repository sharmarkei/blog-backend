'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('blog:post-router');

const Post = require('../model/post.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const postRouter = module.exports = Router();

postRouter.post('/api/post', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/post');

  req.body.userID = req.user._id;
  new Post(req.body).save()
  .then( post => res.json(post))
  .catch(next);
});

postRouter.get('/api/post/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/post/:id');

  Post.findById(req.params.id)
  .then(post => {
    res.json(post);
  })
  .catch(next);
});

postRouter.put('api/post/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT: /api/post/:id');

  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( post => res.json(post))
  .catch( err => next(createError(404, err.message)));
});

postRouter.delete('/api/post/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('DELETE: /api/post/:id');

  Post.findByIdAndRemove(req.params.id)
  .then( () => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});