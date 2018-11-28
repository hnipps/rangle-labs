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

// up modifies all agents by changing the currentFreeAgent field to the availability field. No information
// is added/lost.
exports.up = function(db, cb) {
  shell.exec('mongo rangle-labs ./migrations/mongo-scripts/availabilityUp.js')
  cb()
}

exports.down = function(db, cb) {
  shell.exec('mongo rangle-labs ./migrations/mongo-scripts/availabilityDown.js')
  cb()
}

exports._meta = {
  version: 1.1,
}
