# Built for the Astero Interview Code Challenge

### Goal

To build something functional and meaningful given the provided api.

I decided based on the information provided that the best product would be something in the style of a directory.
Given that most of the data was personal data, contact information and job status, having an individual display with that information seemed like the most useful way to display it.

The list view that makes the home screen includes a picture, name/link to the personal page, title, and department. The "Home" in the top left corner will take you back to this page.

The individual pages contain the same information from the list page, but also includes email, phone number, and various roles that may be relevant to the data based on what i could interpret from the returned data.
A link to the person's manager is provided at the bottom along with the last updated timestamp.

### Other Stuff

Things i have considered adding:

* A filter for the list view
  * This is at the top of the list for things i considered.  The purpose was useful access, so searching by things like department or name initially came to mind.
  * It has not been added yet due to the timeframe to complete the challenge, while there was no set limit given, i still wanted to provide an mvp at the end of one week.

* A tree org structure
 * Since the manager id is being provided i though it would be nice to have a display for the entire organization.
