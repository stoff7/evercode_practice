import { CurrencyService } from '../services/currency.service.js';
import { jest } from '@jest/globals';


let service;
let mockRepo;

beforeEach(() => {
    mockRepo = {
        createCurrency: jest.fn(),
        findCurrencyById: jest.fn(),
        findAllCurrencies: jest.fn(),
        updateCurrency: jest.fn(),
        deleteCurrency: jest.fn(),
    };
    service = new CurrencyService(mockRepo);
});

test('createCurrency throws 400 if name missing', () => {
    expect(() => service.createCurrency({ ticker: 'BTC' }))
        .toThrow('Name and ticker are required');
});

test('createCurrency throws 400 if ticker missing', () => {
    expect(() => service.createCurrency({ name: 'Bitcoin' }))
        .toThrow('Name and ticker are required');
});

test('createCurrency calls repo and returns result', () => {
    const currency = { id: 1, name: 'Bitcoin', ticker: 'BTC' };
    mockRepo.createCurrency.mockReturnValue(currency);

    const result = service.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    expect(mockRepo.createCurrency).toHaveBeenCalledWith({ name: 'Bitcoin', ticker: 'BTC' });
    expect(result).toEqual(currency);
});

test('getCurrency throws 404 if not found', () => {
    mockRepo.findCurrencyById.mockReturnValue(undefined);
    expect(() => service.getCurrency(1)).toThrow('Currency not found');
});

test('getCurrency returns currency', () => {
    const currency = { id: 1, name: 'Bitcoin', ticker: 'BTC' };
    mockRepo.findCurrencyById.mockReturnValue(currency);
    expect(service.getCurrency(1)).toEqual(currency);
});

test('updateCurrency throws 400 if no fields provided', () => {
    expect(() => service.updateCurrency(1, {}))
        .toThrow('At least one of name or ticker must be provided');
});

test('updateCurrency throws 404 if not found', () => {
    mockRepo.findCurrencyById.mockReturnValue(undefined);
    expect(() => service.updateCurrency(1, { name: 'New' })).toThrow('Currency not found');
});

test('deleteCurrency throws 404 if not found', () => {
    mockRepo.findCurrencyById.mockReturnValue(undefined);
    expect(() => service.deleteCurrency(1)).toThrow('Currency not found');
});
