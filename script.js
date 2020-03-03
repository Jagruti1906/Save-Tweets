// Variables 

const tweetList = document.getElementById('tweet-list');




// Event Listeners

eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit',newTweet);
    
    //Remove a Tweet
    tweetList.addEventListener('click',removeTweet);
    
    //Content 
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}



// Functions

function newTweet(e) {
    e.preventDefault();
    
    //Read the content from textarea
    const tweet = document.getElementById('tweet').value;
    
    
    //Add a remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    
    //Create a List
    const li = document.createElement('li');
    li.textContent = tweet;
    
    //Adding button in the list
    li.appendChild(removeBtn);
    
    //Creating a List
    tweetList.appendChild(li);
    
    //Adding tweet in Local Storage
    addTweetLocalStorage(tweet);
    
    //Print an alert
    alert('Tweet Added');
    
    this.reset();
}


//Remove Tweet Function

function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet'))
    {
        e.target.parentElement.remove();
    }
    
    //Remove from LS
    removeTweetLS(e.target.parentElement.textContent);
}


function addTweetLocalStorage(tweet) {
    let tweets = getTweetLocalStorage();
    
    //Add tweet into the array
    tweets.push(tweet);
    
    //Convert tweet array into string
    localStorage.setItem('tweets' , JSON.stringify(tweets));
    
}


function getTweetLocalStorage() {
    let tweets;
    const tweetLS = localStorage.getItem('tweets');
    
    if(tweetLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse( tweetLS );
    }
    
    return tweets;
}



//Local Storage tweets when loaded

function localStorageOnLoad() {
    let tweets = getTweetLocalStorage();
    
    tweets.forEach(function(tweet) {
        //Add a remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //Create a List
        const li = document.createElement('li');
        li.textContent = tweet;

        //Adding button in the list
        li.appendChild(removeBtn);

        //Creating a List
        tweetList.appendChild(li);
    });
}


//removes tweet from LS

function removeTweetLS(tweet) {
    let tweets = getTweetLocalStorage();
    
    //remove the x from the tweet
    const tweetDelete = tweet.substring(0, tweet.length-1);
    
    //loop through the ttweet and delete the one that matches
    
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });
    
    //Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}