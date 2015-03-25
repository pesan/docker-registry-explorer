'use strict';

var express = require('express');
var controller = require('./proxy.controller');

var router = express.Router();

router.all('/:protocol/:hostname/:port/*', controller.index);

module.exports = router;
