/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const $form = $('form');

  const timestamp = function(tweetTime) {
    let date = new Date();
    let nowTime = Math.floor(date.getTime());
    let noOfDays = Math.floor(((nowTime - tweetTime) / 1000) / 86400);
  
    return noOfDays;
  };

  // Generating tweets onto to page
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  
  // Adding the data to the relevant tags from renderTweets
  const createTweetElement = function(tweet) {
    const $article = $('<article>').addClass('new-tweet');
    
    // Header
    const $image = $('<img>').attr('src', tweet.user.avatars);
    const $user = $('<span>').addClass('user-name').text(tweet.user.name);
    const $handle = $('<span>').addClass('handle').text(tweet.user.handle);
  
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
    $article.append($image, $user, $handle, $body, $footer);
  
    return $article;
  };

  // Fetching the tweets (GET request) then rendering to page in RenderTweet function
  const loadTweets = function() {
    $.getJSON('/tweets')
      .then((tweets) => {
        renderTweets(tweets.reverse());
      });
  };

  loadTweets();

  // handle the submit event that gets emitted by the form and prevent its default behaviour of sending the post request and reloading the page.
  //Post request for the tweet
  $form.on('submit', (event) => {
    // Stops page reload submission
    event.preventDefault();
    const data = $('#tweets-text').val().trim();
    let length = data.length;

    if (length <= 0 || data === "" || length === null) {
      $('.error-msg').slideDown(300,() => {
        const $error = $('.error-msg').text(" Invalid character entry. Try again! ");
      });
    } else if (length > 140) {
      $('.error-msg').slideDown(300, () => {
        const $error = $('.error-msg').text(" Too Long! Try again!");
      });
    } else {
      $('.error-msg').slideUp(300);
      
      // Form data formatted into query string using serialize
      const formInfo = $form.serialize();

      $.post('/tweets', formInfo)
        .then((response) => {
          loadTweets();
          $('#tweets-text').val("");
          $('#counter').val("140");
        });
    }
  });
});