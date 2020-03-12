$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="comments-box">
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
            <img class="comments-box__text__image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
        var html =
      `<div class="comments-box">
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
        return html;
    };
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
})
});