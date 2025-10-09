We will be pulling our contestant data from the following API:
- DATA can be found here: https://github.com/kthffmn/bachelor-nation-api/blob/master/data/data.json

## Understanding the original data set
    The data.json file from the Bachelor API is structured around multiple seasons of The Bachelor & The Bachelorette. Each season (like bachelor: { 1: {...}, 2: {...} }) has its own array of contesants:



## How we are going to use the API
We are not using this entire data set. We will only pull a select number of contestants from the larger data set. This will make up the contestant pool used for our project:
* 10 main male contestants
* 10 main female contestants
* 5 "bombshell" male contestants
* 5 "bombshell" female contestants

Therefore, a total of 30 contestants will be selected from the larger dataset. 15 males, 15 females. 
 
 Each season has its own contestants, they will all be combined in one list that we can filter from.
 

From the larger set of data, the following objects will be filtered for each contestant: 
  * Name
  * Age
  * Hometown
  * Occupation

## Adding Custom Fields
The original data does not have everything needed so we will need to add the following data for each contestant:

  * Image of contestant
  * Number of votes, to be used for leaderboard/voting pages
  * ***Gender***
 
 **For example,**
 
>for c in all_contestants:
    c["gender"] = "female"  (or "male", depending on dataset)
    >
    >c["is_bombshell"] = False

 *  ***"Bombshell"*** - this will be a boolean value to distinguish between main and bombshell islanders: 
    - "is_bombshell" = True indicates the islander is a bombshell.

After the custom fields are added, we can save the customized version as a new JSON file (such as islanders.json) so our backend can easily serve data that already fits our app’s structure.