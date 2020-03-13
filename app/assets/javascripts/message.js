$(function(){
  var buildHTML = function(message){
    if ( message.content && message.image ) {
      var html = `<div class="comments-box" data-message-id= ${message.id} >
           <div class="comments-box__users">
             <div class="comments-box__users--name">
              ${message.user_name}
             </div>
             <div class="comments-box__users--time">
              ${message.created_at}
             </div>
           </div>
           <div class="comments-box__text">
             <p class="comments-box__text__content">
              ${message.content}
             </p>
             <img src=${message.image} class="comments-box__text__image" >
           </div>
         </div>` 
    } else if (message.content) {
        var html = `<div class="comments-box" data-message-id= ${message.id} >
          <div class="comments-box__users">
          <div class="comments-box__users--name">
           ${message.user_name}
          </div>
            <div class="comments-box__users--time">
             ${message.created_at}
            </div>
          </div>
          <div class="comments-box__text">
            <p class="comments-box__text__content">
             ${message.content}
            </p>
          </div>
        </div>` 
    } else if (message.image) {
        var html = `<div class="comments-box" data-message-id=${message.id}>
            <div class="comments-box__users">
              <div class="comments-box__users--name">
               ${message.user_name}
              </div>
              <div class="comments-box__users--time">
               ${message.created_at}
              </div>
            </div>
            <div class="comments-box__text">
              <img src=${message.image} class="comments-box__text__image" >
            </div>
          </div>`
    };
    return html;
  }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__contents').append(html);  
        $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});    
        $('form')[0].reset();
        $('.send-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });


    var reloadMessages = function() {
      var last_message_id = $('.comments-box:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main-chat__contents').append(insertHTML);
          $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});