import {Role} from "../models/role.model";
import request from 'supertest';
import app from "../app";
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

const mockRoles = [
    {_id: '67c44a7c085a339f6d138575', name: 'CTO'},
    {_id: '67c44a7c085a339f6d13857e', name: 'Mitarbeiter'},
];

jest.mock('../models/role.model', () => ({
    Role: {
        find: jest.fn(),
    },
}));

describe('Role API', () => {

    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should fetch all roles', async () => {
        (Role.find as jest.Mock).mockResolvedValue(mockRoles);

        const res = await request(app).get('/api/roles');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockRoles);
    });

    it('should handle server errors', async () => {
        (Role.find as jest.Mock).mockRejectedValue(new Error('Server error'));

        const res = await request(app).get('/api/roles');

        console.log(res.status);
        console.log(res.body);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Server error');
    });
});