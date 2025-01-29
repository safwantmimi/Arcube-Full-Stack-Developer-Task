const { urlPost, urlGet, tokenDelete } = require('../controllers/zkController');
const ShortURL = require('../models/url');
const { connectRedis, jobQueue } = require('../helpers/redis');
const { range, hashGenerator, getTokenRange, removeToken } = require('../helpers/zookeeper');

jest.mock('../../src/models/url'); 
jest.mock('../../src/helpers/redis'); 
jest.mock('../../src/helpers/zookeeper'); 

describe('zkController test suite', () => {
    let mockRedisClient;

    beforeEach(() => {
        mockRedisClient = {
            get: jest.fn(),
            setex: jest.fn(),
        };
        connectRedis.mockResolvedValue(mockRedisClient);
        hashGenerator.mockReturnValue('hashedValue');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('urlPost', () => {
        it('should return cached URL if found in Redis', async () => {
            mockRedisClient.get.mockImplementation((key, callback) => {
                callback(null, 'cachedHash');
            });

            const req = { body: { OriginalUrl: 'http://example.com' } };
            const res = { json: jest.fn() };

            await urlPost(req, res);

            expect(connectRedis).toHaveBeenCalled();
            expect(mockRedisClient.get).toHaveBeenCalledWith('http://example.com', expect.any(Function));
            expect(res.json).toHaveBeenCalledWith('cachedHash');
        });

        it('should create a new URL entry if not in Redis or DB', async () => {
            mockRedisClient.get.mockImplementation((key, callback) => {
                callback(null, null);
            });
            ShortURL.findOne.mockImplementation((query, callback) => {
                callback(null, null);
            });
            ShortURL.create.mockImplementation((data, callback) => {
                callback(null, { Hash: 'hashedValue', OriginalUrl: 'http://example.com' });
            });

            const req = { body: { OriginalUrl: 'http://example.com' } };
            const res = { json: jest.fn() };

            await urlPost(req, res);

            expect(ShortURL.findOne).toHaveBeenCalledWith({ OriginalUrl: 'http://example.com' }, expect.any(Function));
            expect(ShortURL.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    Hash: 'hashedValue',
                    OriginalUrl: 'http://example.com',
                }),
                expect.any(Function)
            );
            expect(mockRedisClient.setex).toHaveBeenCalledWith('http://example.com', 600, 'hashedValue');
            expect(res.json).toHaveBeenCalledWith('hashedValue');
        });

        it('should return an error if the URL is invalid', async () => {
            const req = { body: { OriginalUrl: 'invalid-url' } }; // Invalid URL
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            await urlPost(req, res);
        
            // Ensure that no DB or Redis calls happen because we'll get blocked on the client side
            expect(ShortURL.findOne).not.toHaveBeenCalled();
            expect(ShortURL.create).not.toHaveBeenCalled();
            expect(mockRedisClient.setex).not.toHaveBeenCalled();
        });
    });

    describe('urlGet', () => {
        it('should redirect to the original URL if hash is found in DB', async () => {
            ShortURL.findOne.mockImplementation((query, callback) => {
                callback(null, { Hash: 'hashedValue', OriginalUrl: 'http://example.com' });
            });

            const req = { params: { shortened_id: 'hashedValue' } };
            const res = { redirect: jest.fn() };

            await urlGet(req, res);

            expect(ShortURL.findOne).toHaveBeenCalledWith({ Hash: 'hashedValue' }, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('http://example.com');
            expect(jobQueue.enqueue).toHaveBeenCalledWith('hashedValue');
        });

        it('should send an error message if hash is not found in DB', async () => {
            ShortURL.findOne.mockImplementation((query, callback) => {
                callback(null, null);
            });

            const req = { params: { shortened_id: 'invalidHash' } };
            const res = { send: jest.fn() };

            await urlGet(req, res);

            expect(ShortURL.findOne).toHaveBeenCalledWith({ Hash: 'invalidHash' }, expect.any(Function));
            expect(res.send).toHaveBeenCalledWith('URL not found');
        });
    });
});
