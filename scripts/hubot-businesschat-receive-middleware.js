var config = require('./businesschat-config')

module.exports = function (robot) {

    robot.receiveMiddleware(function (context, next, done) {
        var userId = context.response.message.user.id || -1
        var history = robot.brain.users()[userId].history
        var historySet = robot.brain.users()[userId].historySet
        if (history) {
            var lang = robot.brain.users()[userId].lang
            if (config.isRTL(lang)) {
                context.response.message.text = robot.brain.users()[userId]?.history + context.response.message.text
            } else {
                context.response.message.text += robot.brain.users()[userId]?.history
            }
            robot.brain.users()[userId].historySet = true
        }
        next()
    })
}