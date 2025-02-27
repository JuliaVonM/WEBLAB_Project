import {connect} from 'mongoose';
import {Category} from '../models/category.model';
import {Ring} from '../models/ring.model';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const categories = [
    {name: 'Techniques'},
    {name: 'Tools'},
    {name: 'Platform'},
    {name: 'Languages & Frameworks'},
];

const rings = [
    {name: 'Adopt', description: 'Blips that we think you should seriously consider using.'},
    {
        name: 'Trial',
        description: 'Things we think are ready for use, but not as completely proven as those in the Adopt ring.'
    },
    {
        name: 'Assess',
        description: 'Things to look at closely, but not necessarily trial yet — unless you think they would be a particularly good fit for you.'
    },
    {name: 'Hold', description: 'Proceed with caution.'},
];

export const connectToDB = async () => {
    connect(MONGO_DB_URI)
    .then(db => {
        console.log('MongoDB connected to', db.connection.name);

        categories.forEach((category) => {
            Category.findOne({name: category.name})
            .then((exists) => {
                if (!exists) {
                    return Category.create(category);
                }
            })
            .then((newCategory) => {
                if (newCategory) console.log(`Category '${newCategory.name}' added.`);
            })
            .catch((error) => console.error("Error seeding category:", error));
        });

        rings.forEach((ring) => {
            Ring.findOne({name: ring.name})
            .then((exists) => {
                if (!exists) {
                    return Ring.create(ring);
                }
            })
            .then((newRing) => {
                if (newRing) console.log(`Ring '${newRing.name}' added.`);
            })
            .catch((error) => console.error("Error seeding ring:", error));
        });

    })
    .catch(error => {
        console.error(error);
    });
};