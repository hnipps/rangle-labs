'use strict'

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
  db.agents.updateMany({}, { $rename: { currentFreeAgent: 'available' } })
  cb()
}

exports.down = function(db, cb) {
  db.agents.updateMany(
    {},
    {
      $rename: { available: 'currentFreeAgent' },
    },
  )
  cb()
}

exports._meta = {
  version: 1.1,
}
