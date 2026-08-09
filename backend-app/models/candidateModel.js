import pool from '../config/db.js';

export const CandidateModel = {
  findAll: async (stage) => {
    let query = 'SELECT * FROM candidates ORDER BY application_date DESC';
    const values = [];

    if (stage) {
      query = 'SELECT * FROM candidates WHERE stage = $1 ORDER BY application_date DESC';
      values.push(stage);
    }

    const result = await pool.query(query, values);
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (candidateData) => {
    const { name, stage, overallScore, referralStatus, assessmentStatus } = candidateData;
    const query = `
      INSERT INTO candidates (name, stage, overall_score, referral_status, assessment_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, stage, overallScore, referralStatus, assessmentStatus];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, updateData) => {
    const fields = [];
    const values = [];
    let queryIndex = 1;

    for (const [key, value] of Object.entries(updateData)) {
      const columnName = key.replace(/([A-Z])/g, "_$1").toLowerCase(); 
      fields.push(`${columnName} = $${queryIndex}`);
      values.push(value);
      queryIndex++;
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE candidates 
      SET ${fields.join(', ')} 
      WHERE id = $${queryIndex} 
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
};