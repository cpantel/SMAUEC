exports.initial = (user,role,config,bcrypt) => {
  role.create({
    id: 0,
    name: "admin"
  });

  role.create({
    id: 1,
    name: "user"
  });

  user.create({
    username: config.ADMIN_USERNAME,
    email: "admin@samauec.org",
    password: bcrypt.hashSync(config.ADMIN_PASSWORD, 8)
  }).then(user => {
          user.setRoles([0, 1])
  });

  user.create({
    username: "user1",
    email: "user1@example.org",
    password: bcrypt.hashSync("user1", 8)
  }).then(user => {
          user.setRoles([1])
  });

  user.create({
    username: "user2",
    email: "user2@example.org",
    password: bcrypt.hashSync("user2", 8)
  }).then(user => {
          user.setRoles([1])
  });
}
