import { jest } from '@jest/globals';
import { PriceService } from '../services/price.service.js';

let service;
let mockRepo;

beforeEach(() => {
    mockRepo = {
        findByCurrencyTicker: jest.fn(),
    };
    service = new PriceService(mockRepo);
});

test('handlePrice returns prices from repository', () => {
    const prices = [{ symbol: 'BTCUSDT', price: '42000' }];
    mockRepo.findByCurrencyTicker.mockReturnValue(prices);
    expect(service.handlePrice('BTC')).toEqual(prices);
    expect(mockRepo.findByCurrencyTicker).toHaveBeenCalledWith('BTC');
});

test('handlePrice throws 404 if no prices found', () => {
    mockRepo.findByCurrencyTicker.mockReturnValue([]);
    expect(() => service.handlePrice('UNKNOWN')).toThrow('No prices found for ticker UNKNOWN');
});
