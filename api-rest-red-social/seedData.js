// seedData.js
// Bank of realistic English texts to populate the demo.
// image: name of a file listed in IMAGES (seed.js), or null for a text-only post.

const posts = [
    // ── Posts with a photo ──
    { text: "Monday again, but this time with good coffee and the perfect playlist. Now that's how you start a week ☕", image: "coffee.jpg" },
    { text: "Sunday brunch with toast, fruit and way too much coffee. This is the life.", image: "food4.jpg" },
    { text: "Good food, good mood. 🥑🍳✨.", image: "food2.jpg" },
    { text: "Pizza is always a good idea. 🍕❤️", image: "food3.jpg" },
    { text: "Cooked for the whole family today and there wasn't a crumb left. Mission accomplished 👩‍🍳", image: "food4.jpg" },
    { text: "Beach in October: fewer people, great weather and no line at the snack bar. Best of the year.", image: "beach.jpg" },
    { text: "Bike ride along the coast today. If I don't come back, tell them it was for a good cause.", image: "beach2.jpg" },
    { text: "Watched the sunset from the rooftop yesterday and remembered why I love this city so much 🌇", image: "city.jpg" },
    { text: "Couldn't stop looking at the moon tonight. Some nights just ask for a slow walk home.", image: "moon.jpg" },
    { text: "Golden leaves, crisp air and a little peace for the soul. ✨", image: "autumn.jpg" },
    { text: "Sometimes, the most beautiful places are the quietest ones. ✨🍂", image: "autumn3.jpg" },
    { text: "Autumn walks are my favorite reset. Crunchy leaves and a warm jacket.", image: "autumn2.jpg" },
    { text: "First yoga class in months and my back is thanking me for every minute 🧘", image: "yoga.jpg" },
    { text: "Morning stretch before the day starts. Ten minutes that change everything.", image: "yoga2.jpg" },
    { text: "Today's sore muscles have a name and a surname: yesterday's class.", image: "gym.jpg" },
    { text: "Cheers to love, friendship and unforgettable memories! 🥂💍💕.", image: "people.jpg" },
    { text: "Caught up with a college friend after years. It felt like no time had passed.", image: "people2.jpg" },
    { text: "Small habits, big changes. 30 days into a new routine and I'm blown away.", image: "motivation.jpg" },

    // ── Text-only posts ──
    { text: "Tried baking bread at home for the first time. Result: a delicious brick. I'll keep practicing.", image: null },
    { text: "Today's recipe: pasta with whatever is in the fridge. Turned out surprisingly good.", image: null },
    { text: "Some days all I want is a couch, a blanket and a show that doesn't make me think too hard.", image: null },
    { text: "Woke up at 6 to go for a run and I don't know who I am anymore. Tomorrow I'll go back to sleeping in.", image: null },
    { text: "There's nothing like leaving work and it's still light out. Small wins of the season.", image: null },
    { text: "Three hours hunting a bug and it was a missing semicolon. Three hours. One semicolon.", image: null },
    { text: "Learned something new about CSS Grid today and I feel like I've unlocked a superpower.", image: null },
    { text: "Tip of the day: read the whole error message before you panic. It usually tells you what's wrong.", image: null },
    { text: "Just deployed my project and it works on the first try. I don't trust it, but I'm celebrating anyway 🎉", image: null },
    { text: "Learning to code is 20% writing code and 80% googling how to write the thing you already knew.", image: null },
    { text: "There's something deeply satisfying about watching every test pass in green ✅", image: null },
    { text: "A meeting that could have been an email, episode 347.", image: null },
    { text: "Looking at flights for the next trip and my bank account is looking back at me. We'll talk later.", image: null },
    { text: "Just finished a book that left me thinking for days. Similar recommendations, please 📚", image: null },
    { text: "Last night's concert: hoarse voice, arms in the air and zero desire to go home 🎶", image: null },
    { text: "I started reading before bed instead of scrolling my phone. Three days in and I already notice the difference.", image: null },
    { text: "Pineapple on pizza: yes or no? Leave your opinion below and may the odds be ever in your favor 🍕", image: null },
    { text: "My relationship with avocados is complicated: either they're rock hard or overripe. Never anything in between.", image: null },
    { text: "Reminder: you don't need to have it all figured out to take the first step.", image: null },
    { text: "Sometimes the best progress is the kind you can't see day to day but is obvious after a year.", image: null },
    { text: "Saying no is also a way of taking care of yourself. I'm learning it slowly.", image: null },
    { text: "Today wasn't my most productive day, and that's okay. Tomorrow is another one.", image: null },
    { text: "Starting over is scary, but staying where you no longer feel at home is scarier.", image: null },
    { text: "My cat has been staring out the window all morning like she has to solve the mystery of the century 🐱", image: null },
    { text: "Nothing like a board game night with the old gang 🎲", image: null },
    { text: "Surprise birthday party pulled off without them finding out. I'm an excellent spy.", image: null }


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
