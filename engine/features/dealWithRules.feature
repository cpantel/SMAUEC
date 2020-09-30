Feature: Process an incoming message that will eventually create an Activity instance

  Scenario: There are no rules
    Given an Engine with no rules
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be a null value


  Scenario: There is no matching rule
    Given an Engine with this rules
      | rule 1 | /topic/value  | off | 1 | action 1 | /topic/actuator | 3 | on | off |
      | rule 2 | /topic/value2 | on  | 1 | action 1 | /topic/actuator | 3 | on | off |
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be a null value


  Scenario: There is a matching rule
    Given an Engine with this rules
      | rule 3 | /topic/value  | on  | 1 | action 1 | /topic/actuator | 3 | on | off |
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be an Action object
    Then should the result Action be named "action 1"

