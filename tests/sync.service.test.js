import { jest } from '@jest/globals';
import { SyncService } from '../services/sync.service.js';

let service;
let mockCurrencyRepo;
let mockPriceRepo;
let mockSchedulerRepo;

beforeEach(() => {
    mockCurrencyRepo = {
        findAllCurrencies: jest.fn(),
    };
    mockPriceRepo = {
        upsertPrice: jest.fn(),
    };
    mockSchedulerRepo = {
        createLog: jest.fn().mockReturnValue({ id: 1 }),
        updateLog: jest.fn(),
    };
    service = new SyncService(mockCurrencyRepo, mockPriceRepo, mockSchedulerRepo);
});

test('syncPrices logs success when no currencies', async () => {
    mockCurrencyRepo.findAllCurrencies.mockReturnValue([]);
    await service.syncPrices();
    expect(mockSchedulerRepo.createLog).toHaveBeenCalledWith('price-sync');
    expect(mockSchedulerRepo.updateLog).toHaveBeenCalledWith(1, 'success');
    expect(mockPriceRepo.upsertPrice).not.toHaveBeenCalled();
});

test('syncPrices logs error on failure', async () => {
    mockCurrencyRepo.findAllCurrencies.mockImplementation(() => { throw new Error('DB error'); });
    await expect(service.syncPrices()).rejects.toThrow('DB error');
    expect(mockSchedulerRepo.updateLog).toHaveBeenCalledWith(1, 'error', 'DB error');
});
