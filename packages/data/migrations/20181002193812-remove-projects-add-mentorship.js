'use strict'
var shell = require('shelljs')

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db, cb) {
  if (shell.exec('mongorestore ./migrations/migration-backup/version2 2> /dev/null').code !== 0) {
    // restoring failed (could not find mentorship backup)
    shell.echo('[INFO]: no mentorships backup: creating new mentorships in database')
    db.createCollection('mentorships')
  }
  if (
    shell.exec(
      'mongodump --collection projects --db rangle-labs --out ./migrations/migration-backup/version1 2> /dev/null',
    ).code === 0
  ) {
    db.dropCollection('projects')
    cb()
  } else {
    cb(new Error('backing up of projects failed.'))
  }
}

exports.down = function(db, cb) {
  if (shell.exec('mongorestore ./migrations/migration-backup/version1 2> /dev/null').code !== 0) {
    // restoring failed (could not find mentorship backup)
    shell.echo('[INFO]: no projects backup: creating new projects in database')
    db.createCollection('projects')
  }
  if (
    shell.exec(
      'mongodump --collection mentorships --db rangle-labs --out ./migrations/migration-backup/version2',
    ).code === 0
  ) {
    db.dropCollection('mentorships')
    cb()
  } else {
    cb(new Error('backing up of mentorships failed.'))
  }
}

exports._meta = {
  version: 1,
}
