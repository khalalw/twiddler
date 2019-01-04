$(document).ready(function () {
  $("time.timeago").timeago();

  // background image
  $.backstretch("https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cdff4c62302fd44491d4850202323d11&auto=format&fit=crop&w=2250&q=80");

  var $tweets_cont = $('#tweets-container');
  var $moretweets = $('#more-tweets');
  var $span = $('span');
  var $user_prof = $('#user-profile');

  var showUserTweets = function (username) {
    $tweets_cont.html('');
    let index = streams.users[username].length - 1;
    while (index >= 0) {
      let tweet = streams.users[username][index];
      let $tweet = $('<div class="tweets user"></div>');
      $tweet.html('@' + tweet.user + ': ' + tweet.message + ' <div id="tweet-time">- ' + $.timeago(tweet.created_at) + '</div>');
      $tweet.appendTo($tweets_cont);
      index -= 1;
    }
  };

  var showHomeTweets = function () {
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweets"></div>');
      $tweet.html('@<span class="' + tweet.user + '">' + tweet.user + '</span>: ' + tweet.message + ' <div id="tweet-time">- ' + $.timeago(tweet.created_at) + '</div>');
      $tweet.appendTo($tweets_cont);
      index -= 1;
    }
    $span = $('span');
  };

  var sendTweet = function () {
    if (!('javascriptjoe' in streams.users)) {
      streams.users.javascriptjoe = [];
    }
    let tweet = {};
    tweet.user = 'javascriptjoe';
    tweet.message = $('textarea').val();
    tweet.created_at = new Date();
    $('form').trigger('reset');
    addTweet(tweet);
  };


  showHomeTweets();

  // Prevent form from refreshing page
  $('form').submit(function (e) {
    e.preventDefault();
  });

  // Send a tweet
  $(document).on('click', '#tweet', function () {
    sendTweet();
    $tweets_cont.html('');
    showHomeTweets();
  });

  // Home button
  $(document).on('click', '#home', function () {
    $('#new-tweet').show();
    $user_prof.html('<h4>home timeline</h4');
    $tweets_cont.html('');
    showHomeTweets();

    if ($moretweets.hasClass('user-tl')) {
      $moretweets.removeClass('user-tl').addClass('timeline');
    }

  });

  // Update timeline with more recent tweets
  $(document).on('click', '.timeline', function () {
    $tweets_cont.html('');
    showHomeTweets();
  });

  // View a user's timeline on @ name click
  $(document).on('click', 'span', function () {
    $('#new-tweet').hide();
    let username = this.className;
    if (username === 'javascriptjoe') {
      $user_prof.html('<h4>your timeline</h4>');
    } else {
      $user_prof.html('<h4>@' + username + '\'s timeline</h4>');
    }
    showUserTweets(username);

    // Limit view tweets scope to current user
    $moretweets.removeClass('timeline').addClass('user-tl');
    $(document).on('click', '.user-tl', function () {
      $user_prof.html('<h4>@' + username + '\'s timeline</h4>');
      showUserTweets(username);
    });
  });
});