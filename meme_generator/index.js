function getImageHeight(img) {
  let width = img.width;
  let height = img.height;

  let ratio = 500/width;
  return parseInt(height * ratio);
}

function draw(imgSrc) {
  var img = new Image();
  var ctx = document.getElementById('canvas').getContext('2d');
  img.src = imgSrc;

  height = getImageHeight(img);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 500, height);
}

function drawText1(text) {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${textSetting['fontWeight']} ${textSetting['fontSize']}px ${textSetting['fontFamily']}`;

  let lines = text.split('/');
  lines.forEach((line, index) => {
    ctx.fillStyle = textSetting['fontColor'];
    if (index === 0) {
      ctx.fillText(line, canvas.width / 2, 135);
    } else if (index === 1) {
      ctx.fillText(line, canvas.width / 2, 645);
    }
  })
}


function drawText2(text) {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${textSetting['fontWeight']} ${textSetting['fontSize']}px ${textSetting['fontFamily']}`;

  let lines = text.split('/');
  lines.forEach((line, index) => {
    ctx.lineWidth = 4;
    ctx.strokeStyle = textSetting['fontWeight']
    ctx.strokeText(
      line,
      canvas.width / 2,
      canvas.height - 100,
    )

    ctx.fillStyle = textSetting['fontColor'];
    ctx.fillText(
      line, canvas.width /2, h
    );

  })
}

function drawText3(text) {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${textSetting['fontWeight']} ${textSetting['fontSize']}px ${textSetting['fontFamily']}`;

  let lines = text.split('/');
  lines.forEach((line, index) => {
    if (textSetting['fontSize'] === '#FFFFFF') {
      ctx.lineWidth = 4;
      ctx.strokeStyle = textSetting['fontWeight']
      ctx.strokeText(
        line,
        canvas.width / 2,
        canvas.height - 100,
      )
    }

    if (memeIndex === 0) {
      ctx.fillStyle = textSetting['fontColor'];
      var h = 135;
      if (index === 1) {
        h = 640;
      }
      ctx.fillText(
        line, canvas.width /2, h
      );
    } else if(memeIndex === 2){

    }

  })
}


var memeIndex = 0;
var memeImages = ["./meme_image/말대꾸.png", "./meme_image/개비스콘.jpg", "./meme_image/개비스콘.jpg"];
textSetting = {};
textSetting['imageIndex'] = memeIndex;
textSetting['fontFamily'] = 'MalgunGothic';
textSetting['fontSize'] = 30;
textSetting['fontColor'] = '#000000';
textSetting['fontWeight'] = 'normal';

window.onload = function() {

  var inputform = document.getElementById('inputForm');
  var ctx = document.getElementById('canvas').getContext('2d');

  draw("./meme_image/말대꾸.png")

  $('.form-select.memeSelect').on('change', function () {
    var selected = $('.form-select.memeSelect option:selected').val();
    switch(selected) {
      case 'meme1':
        memeIndex = 0;
        draw(memeImages[memeIndex])
        inputform.placeholder="ㅁㅁ가/말대꾸?";
        textSetting['fontColor'] = '#000000';
        break;
      case 'meme2':
        memeIndex = 1;
        draw(memeImages[memeIndex]);
        inputform.placeholder="야근,직장상사/퇴사";
        textSetting['fontColor'] = '#FFFFFF';
        break;
      case 'meme3':
        memeIndex = 2;
        draw(memeImages[memeIndex]);
        textSetting['fontColor'] = '#FFFFFF';
        break;
    }
  });

  $('.form-control').change(function() {
    draw(memeImages[memeIndex]);
    var text = $('.form-control').val();
    switch(memeIndex) {
      case 0:
        drawText1(text);
        break;
      case 1:
        drawText2(text);
        break;
      case 2:
        drawText3(text);
        break;
    }
  });

  $('.form-select.fontSelect').on('change', function () {
    var selected = $('.form-select.fontSelect option:selected').val();
    textSetting['fontFamily'] = selected;
  });

  $('.form-select.fontSizeSelect').on('change', function () {
    var selected = $('.form-select.fontSizeSelect option:selected').val();
    textSetting['fontSize'] = selected;
  });

  $('.form-select.fontBoldSelect').on('change', function () {
    var selected = $('.form-select.fontBoldSelect option:selected').val();
    textSetting['fontWeight'] = selected;
  });
}
