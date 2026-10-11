// seedData.js
// Bank of realistic English texts to populate the demo.

const posts = [
    // Daily life
    "Monday again, but this time with good coffee and the perfect playlist. Now that's how you start a week ☕",
    "Just found a bakery in my neighborhood that makes unreal chocolate croissants. Real danger to my wallet.",
    "Woke up at 6 to go for a run and I don't know who I am anymore. Tomorrow I'll go back to sleeping in.",
    "Some days all I want is a couch, a blanket and a show that doesn't make me think too hard.",
    "First rainy day after the whole summer. And of course I have no umbrella. Classic.",
    "Sunday deep clean with the music turned all the way up. Amazing how much you get done with the right soundtrack 🧹",
    "Tried baking bread at home for the first time. Result: a delicious brick. I'll keep practicing.",
    "There's nothing like leaving work and it's still light out. Small wins of the season.",
    "Spent half an hour deciding what to have for dinner and ended up ordering pizza. As usual.",
    "Watched the sunset from the rooftop yesterday and remembered why I love this city so much 🌇",

    // Tech and work
    "Three hours hunting a bug and it was a missing semicolon. Three hours. One semicolon.",
    "Learned something new about CSS Grid today and I feel like I've unlocked a superpower.",
    "Tip of the day: read the whole error message before you panic. It usually tells you what's wrong.",
    "Just deployed my project and it works on the first try. I don't trust it, but I'm celebrating anyway 🎉",
    "Learning to code is 20% writing code and 80% googling how to write the thing you already knew.",
    "My biggest achievement today: renaming variables so they actually make sense. Future me will be grateful.",
    "There's something deeply satisfying about watching every test pass in green ✅",
    "Today I'm refactoring code I wrote six months ago. Who was that optimistic person?",
    "A meeting that could have been an email, episode 347.",
    "Just finished an online course and I'm already signing up for another one. There's no cure for this.",

    // Travel and plans
    "Weekend getaway to the mountains: phone on airplane mode and boots on. 100% recommend.",
    "Looking at flights for the next trip and my bank account is looking back at me. We'll talk later.",
    "Trying a new restaurant with friends. First round of appetizers: approved 🍽️",
    "Beach in October: fewer people, great weather and no line at the snack bar. Best of the year.",
    "Bike ride along the coast today. If I don't come back, tell them it was for a good cause.",
    "Some towns look like they came straight out of a postcard. Just discovered one an hour from home.",
    "Dinner with a view and good company. Simple plans are underrated.",
    "Planning our vacation with three spreadsheets. Yes, I'm that excited.",

    // Culture, books, music
    "Just finished a book that left me thinking for days. Similar recommendations, please 📚",
    "Went back to the album from my teenage years and everything is still just as good.",
    "Went to the movies alone yesterday and it was one of the best decisions of the month. Highly recommend.",
    "Binge-watching marathon this weekend. I'll regret it tomorrow, but not today.",
    "Last night's concert: hoarse voice, arms in the air and zero desire to go home 🎶",
    "I started reading before bed instead of scrolling my phone. Three days in and I already notice the difference.",
    "Can someone explain why the ending of that show hurt so much? I wasn't prepared.",
    "Photography exhibit this weekend. Left wanting to pick up my camera and never put it down.",

    // Food and cooking
    "Pineapple on pizza: yes or no? Leave your opinion below and may the odds be ever in your favor 🍕",
    "Today's recipe: pasta with whatever is in the fridge. Turned out surprisingly good.",
    "My relationship with avocados is complicated: either they're rock hard or overripe. Never anything in between.",
    "Cooked for the whole family today and there wasn't a crumb left. Mission accomplished 👩‍🍳",
    "Sunday brunch with toast, fruit and way too much coffee. This is the life.",
    "Tried making homemade ice cream with three ingredients and almost became a professional ice cream maker.",
    "Nothing beats the smell of fresh bread in the morning. Nothing.",
    "Found a local farmers market with incredible produce. My weekly grocery run will never be the same.",

    // Reflections and motivation
    "Reminder: you don't need to have it all figured out to take the first step.",
    "Sometimes the best progress is the kind you can't see day to day but is obvious after a year.",
    "I've been taking things more slowly lately and honestly it works.",
    "Saying no is also a way of taking care of yourself. I'm learning it slowly.",
    "Today wasn't my most productive day, and that's okay. Tomorrow is another one.",
    "Surrounding yourself with people who add to your life changes more than it seems. Thank you to mine 💛",
    "Small habits, big changes. 30 days into a new routine and I'm blown away.",
    "Starting over is scary, but staying where you no longer feel at home is scarier.",

    // Sport and wellness
    "First yoga class in months and my back is thanking me for every minute 🧘",
    "Managed to run 5 km without stopping today. For some that's nothing, for me it's a medal.",
    "Going for a walk with no destination is the best reset I know.",
    "Today's sore muscles have a name and a surname: yesterday's class.",
    "Pickup game with friends on Saturday: we lost, but the drinks afterwards made up for it.",

    // Pets and friends
    "My cat has been staring out the window all morning like she has to solve the mystery of the century 🐱",
    "Early morning walk with the dog. He's thrilled. I'm half asleep but also thrilled.",
    "Nothing like a board game night with the old gang 🎲",
    "Caught up with a college friend after years. It felt like no time had passed.",
    "Surprise birthday party pulled off without them finding out. I'm an excellent spy.",
    "Hung out with friends today and we laughed so much my abs hurt."
];

const comments = [
    "Totally agree 🙌",
    "Haha I feel so seen",
    "That looks great, adding it to my list!",
    "This made my day, thanks for sharing",
    "Same thing happened to me last week",
    "You're so right",
    "Love this, you have to tell us more 😍",
    "Good luck, I'm sure it'll turn out great!",
    "Haha you're a legend",
    "Wow, I didn't know that. Thanks for the info!",
    "Wish I could go too",
    "So jealous, in the best way ✨",
    "You just gave me an idea for the weekend, thanks!",
    "I'm on the other team, but I respect your opinion 😂",
    "We need to do this again soon",
    "Great advice, I'm going to try it",
    "This happens a lot and nobody talks about it. Thanks for saying it",
    "That put a smile on my face, thanks 😊",
    "Congrats, you deserve it!",
    "Same here, you're not alone"
];

const bios = [
    "Coffee lover, fan of quiet Sundays and good books.",
    "Curious by nature. Always learning something new.",
    "Weekend traveler and weekday home cook.",
    "Developer in training. Fueled by coffee and Stack Overflow.",
    "Music, shows and spontaneous plans. We'll figure out the rest.",
    "Photography, hiking and a cat who runs the house.",
    "I like the sea, good conversation and silence too.",
    "Designer by day, reader by night. Always hungry.",
    "Learning to take life more slowly (and with more humor).",
    "Fan of local markets, snacks and long dinners.",
    "Occasional athlete, full-time dreamer.",
    "Collector of playlists and good moments."
];

module.exports = { posts, comments, bios };
