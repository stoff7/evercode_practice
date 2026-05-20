import { schedule } from "../utils/scheduler.js";

test('Тест ошибки с расписанием', () => {
    expect(() => schedule('task', 500, () => { })).toThrow();
});