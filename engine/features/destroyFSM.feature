Feature: Process an incoming message that will eventually destroy an Activity

  Scenario: There are no Activities
    Given an Engine with no Activities
    When the Engine is asked for the Activity for "/topic/value" "off"
    Then should the result be a null value

  Scenario: There are other Activities
    Given an Engine with this rules
      | /topic/value  | on  |
    When the Engine creates an Activity for "/topic/value" "on"
    When the Engine is asked for the Activity for "/topic/value" "off"

