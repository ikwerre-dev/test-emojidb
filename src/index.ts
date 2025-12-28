import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import EmojiDB from '@ikwerre-dev/emojidb';
const db = new EmojiDB();

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get('/test', async (c) => {

  const connectdb = await db.connect();
  const dbopen = await db.open('prod.db', 'my-secret-key');


  const migrate = await db.migrate('users', [
    { Name: 'id', Type: 0, Unique: true },
    { Name: 'name', Type: 1, Unique: false } // New field
  ]);

  // const dbinsert = await db.insert('users', { id: 1, username: 'Robinson Honour' });
  // await db.insert('users', { id: 2, username: 'Robinson Honour2' });
  // await db.insert('users', { id: 3, username: 'Robinson Honour3' });
  const users = await db.query('users', { id: 1 });


  console.log(connectdb)
  console.log(users)


  return c.text('Testing!!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
