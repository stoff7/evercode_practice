export class SchedulerRepository {
    constructor(db) {
        this.db = db;
    }

    createLog(taskName) {
        const result = this.db.prepare(`
            INSERT INTO scheduler_logs (task_name, started_at, status)
            VALUES (?, ?, 'running')
        `).run(taskName, new Date().toISOString());

        return this.db.prepare('SELECT * FROM scheduler_logs WHERE id = ?').get(result.lastInsertRowid);
    }

    updateLog(id, status, error = null) {
        this.db.prepare(`
            UPDATE scheduler_logs
            SET status = ?, finished_at = ?, error = ?
            WHERE id = ?
        `).run(status, new Date().toISOString(), error, id);
    }

    findAll() {
        return this.db.prepare('SELECT * FROM scheduler_logs ORDER BY started_at DESC').all();
    }

    findRunning() {
        return this.db.prepare("SELECT * FROM scheduler_logs WHERE status = 'running'").all();
    }
}
