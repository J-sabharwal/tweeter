/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const $form = $('form');

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const timestamp = function(tweetTime) {
    let date = new Date();
    let nowTime = Math.floor(date.getTime());
    let noOfDays = Math.floor(((nowTime - tweetTime) / 1000) / 86400);
  
    return noOfDays;
  };

  const renderTweets = function(tweets) {
  // $('#tweets-container').empty();
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  
  const createTweetElement = function(tweet) {
    const $article = $('<article>').addClass('new-tweet');
    
    // Header
    const $image = $('<img>').attr('src', tweet.user.avatars);
    const $user = $('<span>').addClass('.user-name').text(tweet.user.name);
  
    //Body
    const $body = $('<p>').text(tweet.content.text);

    //Footer
    // Function call to generate number of days gone
    const $footer = $('<footer>').text(timestamp(tweet.created_at) + ' Days Ago');
    const $footerspan = $('<span>').addClass('fonts');
    const $flag = $('<i>').addClass('fa fa-flag');
    const $retweet = $('<i>').addClass('fa fa-retweet');
    const $heart = $('<i>').addClass('fa fa-heart');
    // Appended the span footer tag to tweet footer
    $footerspan.append($flag, $retweet, $heart);
    $footer.append($footerspan);
    $article.append($image, $user, $body, $footer);
  
    return $article;
  };
  renderTweets(tweetData);

  $form.on('submit', (event) => {
    event.preventDefault();
    const formInfo = $form.serialize();

    $.post('/tweets', formInfo)
    .then((response) => {
      console.log(response);
    });
  });

});