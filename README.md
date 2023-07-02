Frontend Developer Assignment exercise submission

##Features Implemented
1. Address length validation, must be of length 40
2. Format validation, must be of shape address, amount
3. Check if amount was added, throws an error if otherwise
4. Check if a valid amount was added, only accepts numbers
5. Check if accurate address was added, just 0-9, a-f. Other character throws an error
6. Duplicate address. Checks if two addresses have been added twice. Deletes one when the merge button is clicked.
7. A bigger view for the list addresses form. Following the sample website provided, (https://classic.multisender.app/), I implemented an expanded view when the expand icon is clicked, it is then toggled back when it is clicke again.
8. Stage management. Based on whether the address has been well validated, the summary steps on the page is updated
9. CSV upload. Users can upload a list of addresses and amount from a list of CSV file, a sample exel sheet is provided.
10. Enter a single amount for all the list of addresses
11. Toast message built using the context API to display a success message on successful address validation.
12. Summary page, totalling the amount entered for each each address.


##Code structure
Following a Functional componenet architecture, each login is adequately modularised and an utility folder is created, where the address validation functions are exported.

##Limitations
Mobile Responsiveness. Due to the fact that bulk of the time was spent on getting the business logic right, I couldn't work on the mobile version of the app. 

##Improvements
There are still some room for improvement, more modularization and little touches. 


###Thanks for taking out time to consider my application, Looking forward
