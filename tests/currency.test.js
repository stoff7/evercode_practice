test('Create currency', async () => {
    const response = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'TEST_CURRENCY', ticker: 'TST' })
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('TEST_CURRENCY');
    expect(data.ticker).toBe('TST');
});

test('Get currency by ID', async () => {
    const createResponse = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'TEST_CURRENCY_2', ticker: 'TST2' })
    });
    const createdCurrency = await createResponse.json();
    const response = await fetch(`http://localhost:3000/currency/${createdCurrency.id}`, {
        method: 'GET',
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(createdCurrency.id);
    expect(data.name).toBe('TEST_CURRENCY_2');
    expect(data.ticker).toBe('TST2');
});

test('Update currency', async () => {
    const createResponse = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'TEST_CURRENCY_3', ticker: 'TST3' })
    });
    const createdCurrency = await createResponse.json();
    const response = await fetch(`http://localhost:3000/currency/${createdCurrency.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'UPDATED_CURRENCY_3' })
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(createdCurrency.id);
    expect(data.name).toBe('UPDATED_CURRENCY_3');
    expect(data.ticker).toBe('TST3');
});

test('Delete currency', async () => {
    const createResponse = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'TEST_CURRENCY_4', ticker: 'TST4' })
    });
    const createdCurrency = await createResponse.json();
    const response = await fetch(`http://localhost:3000/currency/${createdCurrency.id}`, {
        method: 'DELETE',
    });
    expect(response.status).toBe(204);
    const getResponse = await fetch(`http://localhost:3000/currency/${createdCurrency.id}`, {
        method: 'GET',
    });
    expect(getResponse.status).toBe(404);
});

test('Get all currencies', async () => {
    const response = await fetch('http://localhost:3000/currency', {
        method: 'GET',
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
});