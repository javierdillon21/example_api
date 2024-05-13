import type { NextApiRequest, NextApiResponse } from 'next'
const sql = require('mssql')
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a POST request
    const result= await DBconnection()
    res.status(200).json({t: result})
  } else {
    // Handle any other HTTP method
  }
}

const sqlConfig = {
  user: 'javier',
  password: 'pass',
  database: 'testdb',
  server: 'localhost',
  options: {
    encrypt: false, // for azure
    port: 51040
  }
}

async function DBconnection() {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  let conn= await sql.connect(sqlConfig)
  const result = await sql.query`select * from dbo.Table_1`
  const res= JSON.stringify(result.recordset)
  conn.close()
  return res

 } catch (err) {
    console.log(err);
 }
}