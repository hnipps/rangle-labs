'use strict';
var shell = require('shelljs');

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

exports.up = function(db, cb) {
  if (shell.exec('mongorestore ./migration-backup/version2').code !== 0) { // restoring failed (could not find mentorship backup)
    db.createCollection('mentorships');
  }
  if ( shell.exec('mongodump --collection projects --db rangle-labs --out ./migrations/migration-backup/version1').code === 0) {
    db.dropCollection('projects');
    cb();
  } else {
    cb(new Error('backing up of projects failed.'));
  }
};

exports.down = function(db, cb) {
  
  db.createCollection('projects');
  db.dropCollection('mentorships');
  cb();
  return db;
};

exports._meta = {
  "version": 1
};
