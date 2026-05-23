test('GET /status should return 200 and status message (NOTE: SERVER MUST BE RUNNING)', async () => {
    const response = await fetch('http://localhost:3000/status');
    expect(response.status).toBe(200);
    const text = await response.text();
    console.log(text);
    expect(text).toBe("OK");
});