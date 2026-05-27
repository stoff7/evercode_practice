test('Get price for valid ticker', async () => {
    await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Bitcoin', ticker: 'BTC' })
    });

    const response = await fetch('http://localhost:3000/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: 'BTC' })
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    const prices = data.prices;
    expect(Array.isArray(prices)).toBe(true);
    expect(prices.length).toBeGreaterThan(0);
    expect(prices[0]).toHaveProperty('symbol');
    expect(prices[0]).toHaveProperty('price');
    expect(prices.every(item => item.symbol.includes('BTC'))).toBe(true);
});

test('Get price for unknown ticker returns 404', async () => {
    const response = await fetch('http://localhost:3000/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: 'unknown' })
    });
    expect(response.status).toBe(404);
});
