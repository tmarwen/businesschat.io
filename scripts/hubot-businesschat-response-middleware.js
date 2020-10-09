module.exports = function (robot) {

    robot.responseMiddleware(function (context, next, done) {
        let userId = context.response.message.user.id || -1
        robot.brain.users()[userId].history = context.strings[0]
        next()
    })
}