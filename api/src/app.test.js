const knex = require('knex')(require('../knexfile.js')['development']);

afterAll(() => knex.destroy());

describe('Database Structure:', () => {
    test('Should have a units table.', async () => {
        await knex.schema.hasTable('units')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have an SFSC table.', async () => {
        await knex.schema.hasTable('sfscs')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have a demographics table.', async () => {
        await knex.schema.hasTable('demographics')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have an awards table.', async () => {
        await knex.schema.hasTable('awards')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have an award packages table.', async () => {
        await knex.schema.hasTable('award_packages')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have an users/mentors join table.', async () => {
        await knex.schema.hasTable('users_mentors')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have a users table.', async () => {
        await knex.schema.hasTable('users')
        .then(result => {
            expect(result).toBe(true);
        });
    });
    test('Should have a requirements table.', async () => {
        await knex.schema.hasTable('requirements')
        .then(result => {
            expect(result).toBe(true);
        });
    });
})

describe('Database Seeding', () => {
    test('Demographics should be seeded.', async () => {
        await knex.select('*').from('demographics').where('name', '=', 'Gender')
        .then(result => {
            expect(result[0].name).toBe('Gender');
        });
    });
    test('Units should be seeded.', async () => {
        await knex.select('*').from('units').where('name', '=', '61 CYS')
        .then(result => {
            expect(result[0].name).toBe('61 CYS');
        });
    });
    test('Requirements should be seeded.', async () => {
        await knex.select('*').from('requirements').where('sfscs_code', '=', '17S')
        .then(result => {
            expect(result[0].rank_category).toBe('CGO');
        });
    });
    test('Awards should be seeded.', async () => {
        await knex.select('*').from('awards').where('title', '=', 'Junior Enlisted - Guardian of the Quarter')
        .then(result => {
            expect(result[0].requirements_id).toBe(6);
        });
    });
    test('SFSCs should be seeded.', async () => {
        await knex.select('*').from('sfscs').where('code', '=', '5C0X1-K')
        .then(result => {
            expect(result[0].title).toBe('Cybersecurity Analyst');
        });
    });
    test('Users should be seeded.', async () => {
        await knex.select('*').from('users').where('last_name', '=', 'Horne')
        .then(result => {
            expect(result[0].first_name).toBe('Kyle');
        });
    });
    test('Award Packages should be seeded.', async () => {
        await knex.select('*').from('award_packages').where('user_id', '=', '1')
        .then(result => {
            expect(result[0].award_text).toBe('At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.');
        });
    });
})