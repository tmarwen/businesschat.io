'use strict'
// Description:
//   Responds to main Businesschat.io request
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot businesschat - Hubot process a request
//
// Author:
//   Marouane Trabelsi

module.exports = function (robot) {

  robot.hear(/^السلام$|^أهلاً$|^مرحبا$/i, res => {
    res.send('مرحبا بك في الشات بوت الخاص بشركة ناس للطيران في البداية، نود ان نتعرف عليك')
    res.send('ما هو اسمك؟')
  });

  robot.hear(/ما هو اسمك؟(.*)/i, res => {
    res.send(`Hello ${res.match[1]}`)
  });

  robot.respond(/open the (.*) doors/i, function (res) {
    const doorType = res.match[1];
    if (doorType === "pod bay") {
      return res.reply("I'm afraid I can't let you do that.");
    } else {
      return res.reply(`Opening ${doorType} doors`);
    }
  });

  robot.hear(/I like pie/i, res => res.emote("makes a freshly baked pie"));

  const lulz = ['lol', 'rofl', 'lmao'];

  robot.respond(/lulz/i, res => res.send(res.random(lulz)));
  //
  robot.topic(res => res.send(`${res.message.text}? That's a Paddlin'`));


  const enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you'];
  const leaveReplies = ['Are you still there?', 'Target lost', 'Searching'];

  robot.enter(res => res.send(res.random(enterReplies)));
  robot.leave(res => res.send(res.random(leaveReplies)));

  const answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING;

  robot.respond(/what is the answer to the ultimate question of life/, function (res) {
    if (answer == null) {
      res.send("Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again");
      return;
    }
    return res.send(`${answer}, but what is the question?`);
  });

  robot.respond(/you are a little slow/, res => setTimeout(() => res.send("Who you calling 'slow'?")
    , 60 * 1000));

  let annoyIntervalId = null;

  robot.respond(/annoy me/, function (res) {
    if (annoyIntervalId) {
      res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
      return;
    }

    res.send("Hey, want to hear the most annoying sound in the world?");
    return annoyIntervalId = setInterval(() => res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH")
      , 1000);
  });

  robot.respond(/unannoy me/, function (res) {
    if (annoyIntervalId) {
      res.send("GUYS, GUYS, GUYS!");
      clearInterval(annoyIntervalId);
      return annoyIntervalId = null;
    } else {
      return res.send("Not annoying you right now, am I?");
    }
  });


  robot.router.post('/hubot/chatsecrets/:room', function (req, res) {
    const {
      room
    } = req.params;
    const data = JSON.parse(req.body.payload);
    const {
      secret
    } = data;

    robot.messageRoom(room, `I have a secret: ${secret}`);

    return res.send('OK');
  });

  robot.error(function (err, res) {
    robot.logger.error("DOES NOT COMPUTE");

    if (res != null) {
      return res.reply("DOES NOT COMPUTE");
    }
  });

  robot.respond(/have a soda/i, function (res) {
    Get(number in sodas(had((coerced(to(a(number)))).
      sodasHad = (robot.brain.get('totalSodas') * 1) || 0
    )
    )
    );

    if (sodasHad > 4) {
      return res.reply("I'm too fizzy..");

    } else {
      res.reply('Sure!');

      return robot.brain.set('totalSodas', sodasHad + 1);
    }
  });

  return robot.respond(/sleep it off/i, function (res) {
    robot.brain.set('totalSodas', 0);
    return res.reply('zzzzz');
  });
};
