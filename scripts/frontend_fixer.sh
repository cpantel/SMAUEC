find . | while read file ; do echo -n "mv $file "; echo $file | sed -e 's/user/action/g'; done | grep user > fix

FROM=User
TO=Action
grep "$FROM" -rl | while read FILE; do sed  "$FILE" -i -e "s/$FROM/$TO/g"; done
FROM=user
TO=action
grep "$FROM" -rl | while read FILE; do sed  "$FILE" -i -e "s/$FROM/$TO/g"; done


for pair in "name Name" "topic Topic" "description Description" "is_enabled Enabled" "activation Activation" "duration Duration" "action Action"; do
   read ELEM TITLE < <(echo $pair)
   echo "    <div class=\"form-group\">"
   echo "      <label for=\"$ELEM\">$TITLE:</label>"
   echo "      <input type=\"text\" formControlName=\"$ELEM\" placeholder=\"$ELEM\" name=\"$ELEM\" class=\"form-control\" id=\"$ELEM\">"
   echo "    </div>"
done


for pair in "name Name" ; do

for pair in "name Name" "topic Topic" "description Description" "is_enabled Enabled" "activation Activation" "duration Duration" "action Action"; do



for pair in "name Name" "description Description" "topic Topic" "min_activation_time Min Activation" "activation_value Activation Value" "cancellation_value Cancellation Value"; do
   read ELEM TITLE < <(echo $pair)
   echo "    <div class=\"form-group\">"
   echo "      <label for=\"$ELEM\">$TITLE:</label>"
   echo "      <input type=\"text\" formControlName=\"$ELEM\" placeholder=\"$ELEM\" name=\"$ELEM\" class=\"form-control\" id=\"$ELEM\">"
   echo "    </div>"


done



for pair in "name Name" "description Description" "topic Topic" "min_activation_time Min Activation" "activation_value Activation Value" "cancellation_value Cancellation Value"; do
   read ELEM TITLE < <(echo $pair)
   echo "      <th>$TITLE</th>"
done

CLASS=action
for pair in "name Name" "description Description" "topic Topic" "min_activation_time Min Activation" "activation_value Activation Value" "cancellation_value Cancellation Value"; do
   read ELEM TITLE < <(echo $pair)
   echo "        <th>{{$CLASS.$ELEM}}</th>"
done
