# Generate a scenario base on the below (without code)
1. Read the .github folder for instructions if you haven't yet 
2. Follow the instructions to generate 

# Scenario: Verify the cwp-plan summary

## Description
1. Type: View
2. View: cwp-plan
3. Description: Verify the plan summary section has data

## Steps
1. open a cwp-plan
2. Assert you can see an element with data-testid = "vp-shared-plan-summary-plan-summary""
3. Assert you can see these three text 
    - "LOA {non-zero-digit}"
    - "Discharge {non-zero-digit}"
    - "Loading {non-zero-digit}"