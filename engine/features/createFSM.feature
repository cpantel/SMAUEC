Feature: Process an incoming message that will eventually create a FSM instance

  Scenario: There are no rules
    Given an Engine with no rules
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be a null value


  Scenario: There is no matching rule
    Given an Engine with this rules
      | /topic/value  | off |
      | /topic/value2 | on  |
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be a null value


  Scenario: There is a matching rule
    Given an Engine with this rules
      | /topic/value  | on  |
    When the Engine is asked for the Rule "/topic/value" "on"
    Then should the result be a FSM object

