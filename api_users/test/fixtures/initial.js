exports.initial = (user,role,config,bcrypt) => {
  role.create({
    id: 0,
    name: "admin"
  });

  role.create({
    id: 1,
    name: "user"
  });

  // TODO: take from configuration or generate password and publish it in log
  user.create({
    id: 0,
    username: config.ADMIN_USERNAME,
    email: "admin@samauec.org",
    password: bcrypt.hashSync(config.ADMIN_PASSWORD, 8)
  }).then(user => {
          user.setRoles([0, 1])
  });


}
