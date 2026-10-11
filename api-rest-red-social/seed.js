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

// Devuelve una función que entrega elementos sin repetir hasta agotar el array,
// y entonces vuelve a barajar y empieza otra vuelta
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

const nextPost = createDeck(posts);
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
    const techImages = [
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581091215367-59ab6a6c6c5f?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&auto=format&fit=crop&q=80"
    ];

    for (const user of users) {
        const followersData = await Follow.find({ followed: user._id }).lean();
        const followersIds = followersData.map(f => f.user.toString());

        for (let i = 0; i < countPerUser; i++) {
            const publication = new Publication({
                text: nextPost(),
                user: user._id,
                file: Math.random() < 0.7 ? `https://picsum.photos/seed/crush-${user._id}-${i}/800/800` : undefined,
                created_at: faker.date.recent({ days: 30 }), // fecha aleatoria, no siempre "ahora"
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
        // Filtra a los usuarios que no sean el mismo
        const others = users.filter(u => u._id.toString() !== user._id.toString());

        // Si no hay usuarios disponibles para seguir, no se crea ninguna relación
        if (others.length === 0) continue;

        // Escoge aleatoriamente a quién seguir (sin repetir)
        const followedSet = new Set();
        while (followedSet.size < followsPerUser && followedSet.size < others.length) {
            followedSet.add(pickRandom(others)._id.toString());
        }

        // Guardar las relaciones de seguimiento
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
