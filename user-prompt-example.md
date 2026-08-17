# Generate a scenario base on the below (without code)
1. Read the .github folder for instructions if you haven't yet 
2. Follow the instructions to generate 

# Scenario: Open loading container list in create mask view

# View
1. create-mask

# Description: 
1. open crate-mask view

# Steps
1. open create-mask view
2. Assert you can see the text "LOADING CONTAINER LIST"
3. Assert you can see an element with data-testid = "vp-create-mask-loading-cntr-list"
4. Assert "Rows: 0" become "Rows: {digit}"
    - {digit} means any non-zero digit
    - when {digit} is 1000 or more, it will be 1,000; you should ignore the ","