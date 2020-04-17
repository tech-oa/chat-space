$(function(){ 
  function buildHTML(message){
     if ( message.image ) {
     var html =
      `<div class="chat-main__message-list__index">
          ${message.user_name}
          <div class="chat-main__message-list__index__date">
            ${message.created_at}
          </div>
          <div class="chat-main__message-list__text">
            <p class="chat-main__message-list__index__text">
              ${message.content}
            </p>
          <div class="chat-main__message-list__index__text__image">
            <img src=${message.image} >
          </div>
        </div>`
      return html;
    
    } else {
     var html =
         `<div class="chat-main__message-list__index">
             ${message.user_name}
            <div class="chat-main__message-list__index__date">
             ${message.created_at}
            </div>
            <div class="chat-main__message-list__text">
              <p class="chat-main__message-list__index__text">
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
  var url = $(this).attr('action')
  $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
  })
  .done(function(data){
    console.log("test")
    var html = buildHTML(data);
    // クラスを自分のクラスに直す
    $('.chat-main__message-list').append(html);
    $('form')[0].reset();
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
  return false;
})
});