// seed.js
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('./models/user');
const Publication = require('./models/publication');
const Follow = require('./models/follow');
const { posts, comments, bios } = require('./seedData');

mongoose.connect(process.env.MONGO_URI);

// Seed photos hosted on the author's Cloudinary account.
// If you use another account, upload your own photos and replace these URLs.
const IMAGES = {
    "food.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909592/food.jpg",
    "food2.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909593/food2.jpg",
    "food3.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909578/food3.jpg",
    "food4.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909587/food4.jpg",
    "people.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909578/people.jpg",
    "people2.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909588/people2.jpg",
    "autumn.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909589/autumn.jpg",
    "autumn2.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909585/autumn2.jpg",
    "autumn3.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909591/autumn3.jpg",
    "city.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909591/city.jpg",
    "beach.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909581/beach.jpg",
    "beach2.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909587/beach2.jpg",
    "moon.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909578/moon.jpg",
    "yoga.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909584/yoga.jpg",
    "yoga2.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909579/yoga2.jpg",
    "gym.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909582/gym.jpg",
    "coffee.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909581/coffee.jpg",
    "motivation.jpg": "https://res.cloudinary.com/ehmyyrd7/image/upload/v1794909584/motivation.jpg",
};

// Fail fast if a post points to an image that is not listed above
for (const p of posts) {
    if (p.image && !IMAGES[p.image]) {
        throw new Error(`seedData.js: image "${p.image}" is not defined in IMAGES`);
    }
}
const imageUrl = (name) => (name ? IMAGES[name] : undefined);

// Elige un elemento al azar (se pueden repetir)
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Baraja una copia del array (Fisher-Yates)
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Entrega elementos sin repetir hasta agotar el array; luego vuelve a barajar
function createDeck(array) {
    let deck = shuffle(array);
    let index = 0;

    return function next() {
        if (index >= deck.length) {
            deck = shuffle(array);
            index = 0;
        }
        return deck[index++];
    };
}

const nextPost = createDeck(posts); // devuelve { text, image }
const nextBio = createDeck(bios);

async function createFakeUsers(count = 10) {
    const users = [];

    for (let i = 0; i < count; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email({ firstName: firstname, lastName: lastname });
        const nick = faker.internet.username({ firstName: firstname, lastName: lastname });
        const avatar = faker.image.avatar();
        const password = await bcrypt.hash('123456', 10); // contraseña por defecto

        const user = new User({
            name: firstname,
            surname: lastname,
            nick: nick.toLowerCase(),
            email: email.toLowerCase(),
            password: password,
            image: avatar,
            city: faker.location.city(),
            country: faker.location.country(),
            profileDetails: {
                bio: nextBio()
            }
        });

        await user.save();
        users.push(user);
    }

    return users;
}

async function createFakePublications(users, countPerUser = 3) {
    for (const user of users) {
        const followersData = await Follow.find({ followed: user._id }).lean();
        const followersIds = followersData.map(f => f.user.toString());

        for (let i = 0; i < countPerUser; i++) {
            const post = nextPost();
            const publication = new Publication({
                text: post.text,
                user: user._id,
                file: imageUrl(post.image),
                created_at: faker.date.recent({ days: 30 }),
                likes: [],
                comments: []
            });

            const maxLikes = Math.min(5, followersIds.length);
            const likeCount = Math.floor(Math.random() * (maxLikes + 1));
            const usedLikes = new Set();
            while (usedLikes.size < likeCount) {
                usedLikes.add(pickRandom(followersIds));
            }
            publication.likes = Array.from(usedLikes);

            const maxComments = Math.min(3, followersIds.length);
            const commentCount = Math.floor(Math.random() * (maxComments + 1));
            for (let j = 0; j < commentCount; j++) {
                publication.comments.push({
                    user: pickRandom(followersIds),
                    text: pickRandom(comments),
                    created_at: new Date()
                });
            }

            await publication.save();
        }
    }
}

async function createFakeFollows(users, followsPerUser = 3) {
    for (const user of users) {
        const others = users.filter(u => u._id.toString() !== user._id.toString());
        if (others.length === 0) continue;

        const followedSet = new Set();
        while (followedSet.size < followsPerUser && followedSet.size < others.length) {
            followedSet.add(pickRandom(others)._id.toString());
        }

        for (const followedId of followedSet) {
            const follow = new Follow({
                user: user._id,
                followed: followedId
            });

            await follow.save();
        }
    }
}

async function seed() {
    console.log('🔄 Limpiando base de datos...');
    await User.deleteMany();
    await Publication.deleteMany();
    await Follow.deleteMany();

    console.log('👥 Creando usuarios falsos...');
    const users = await createFakeUsers(10);

    console.log('🔗 Creando relaciones de seguimiento...');
    await createFakeFollows(users, 3);

    console.log('📝 Creando publicaciones...');
    await createFakePublications(users, 5);

    console.log('✅ ¡Todo listo!');
    await mongoose.disconnect();
}

seed().catch(async (err) => {
    console.error('❌ Error al generar datos:', err);
    await mongoose.disconnect();
});