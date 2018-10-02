'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.dropCollection('projects');
  db.createCollection('mentorships');
  return db;
};

exports.down = function(db) {
  db.createCollection('projects');
  db.dropCollection('mentorships');
  return db;
};

exports._meta = {
  "version": 1
};
