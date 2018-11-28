db.agents.updateMany({}, { $rename: { available: 'currentFreeAgent' } })
