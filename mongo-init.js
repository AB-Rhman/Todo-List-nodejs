db = db.getSiblingDB('todo_db');

db.createUser({
  user: 'todo_user',
  pwd: 'todo_password',
  roles: [
    {
      role: 'readWrite',
      db: 'todo_db'
    }
  ]
});

db.createCollection('tasks');
db.createCollection('users');

db.tasks.createIndex({ "createdAt": 1 });
db.tasks.createIndex({ "completed": 1 });
db.users.createIndex({ "email": 1 }, { unique: true });

print('MongoDB initialization completed successfully!'); 