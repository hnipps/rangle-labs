db.mentorships.updateMany({}, { $unset: { difficulty: '' } })
db.mentorships.updateMany({}, { $unset: { trelloBoardUrl: '' } })
db.mentorships.updateMany({}, { $unset: { githubUrl: '' } })
