Readable - React based content/comment app
=====================================

Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.


----------

**Steps to run the application:**

 1. Start the local backend development server (https://github.com/udacity/reactnd-project-readable-starter)
 2. Clone the application from - https://github.com/hawaijar/reactnd-project-readable.git 
 3. Go to your local file system where the project clone is there. In my case, I would run the below command -
 ***cd ~/Udacity/projects/reactnd-project-readable-starter***
 assuming, I installed at the path - (home directory)/Udacity/projects
 4. Run the project dependency using the below command -
 ***yarn install***
 
 5. Run the application using the command below -
 ***yarn start***


 Testing
-------------
By default, the application displays three posts -

 - The genius Iron Man
 - The incredible Hulk
 - The amazing Spiderman
They are given some default *vote score*. By default, they are sorted based on last created time. You may sort based on *vote score* using the sorting toggle button (top right corner)

**A**. Add new post
 - Click the **Add Post**  button (top left corner). 
 - A form will be presented. Enter the **Title** and **Body**. Select the category and click the **Submit** button.
 
 **B**. Edit post
 - Click the **Edit** icon and update the Title or/and Body. Category is optional as it will be default to its category.
 
 **C**. Delete post
 - Click the **Delete** icon against the post to be deleted.
 
 **D** Add comments
 - Click the post and it will go to its detailed page.  There you will be presented a form to add comments.
 - Add comments and click the **publish** button.
 - You may click the **UpVote** / **DownVote** buttons to increase/decrease the vote score of the comment
 - The total comments of the post will be seen just above the comment form.

 **E** Edit/Delete comments
 - Comments can be edited or deleted by clicking the respective icons (inside its comment on the right corner).
 
 **F** All comments are sorted by *Vote score*.