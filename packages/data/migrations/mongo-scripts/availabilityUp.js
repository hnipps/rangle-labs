db.agents.updateMany({}, { $rename: { currentFreeAgent: 'available' } })
