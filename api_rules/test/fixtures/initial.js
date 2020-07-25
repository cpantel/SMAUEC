exports.initial = (action) => {
  action.create({
    name: "Test action number one",
    description: "Test action number one",
    topic: "/alarm",
    min_activation_time: "10",
    activation_value: "on",
    cancellation_value: "off"
  });

  action.create({
    name: "Test action number two",
    description: "Test action number two",
    topic: "/led",
    min_activation_time: "20",
    activation_value: "on",
    cancellation_value: "off"
  });

  action.create({
    id: 3,
    name: "Test action number three",
    description: "Erasable test action",
    topic: "/led",
    min_activation_time: "15",
    activation_value: "on",
    cancellation_value: "off"
  });

/*



.then(user => {
          user.setRoles([0, 1])
  });
*/
}
