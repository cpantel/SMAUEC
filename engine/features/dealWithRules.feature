Feature: Process an incoming message that will eventually create an Action instance

  Scenario: There are no rules
    Given an Engine with no rules
    When the Engine is asked for Actions
    Then should the result be an empty array


  Scenario: There is no matching rule
    Given an Engine with this rules
      | rule 1 | /topic/value  | off | 1 | action 1 | /topic/actuator | off | 3 | on | off |
      | rule 2 | /topic/value2 | on  | 1 | action 1 | /topic/actuator | off | 3 | on | off |
    When the Engine receives a message "/topic/value" "on"
    When the Engine is asked for Actions
    Then should the result be an empty array

  Scenario: There is a matching rule
    Given an Engine with this rules
      | rule 3 | /topic/value  | on  | 1 | action 4 | /topic/actuator2 | off | 3 | on | off |
    When the Engine receives a message "/topic/value" "on"
    When the Engine is asked for Actions
    Then should the result be an Action object
    Then should the result has the topic "/topic/actuator2"
    Then should the result has the name "action 4"

