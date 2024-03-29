function getImageHeight(img) {
  let width = img.width;
  let height = img.height;

  let ratio = 500 / width;
  return parseInt(height * ratio);
}

function draw(img) {
  var cvs = document.getElementById('canvas');
  var ctx = cvs.getContext('2d');

  height = getImageHeight(img);
  cvs.height = height;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 500, height);
}

function drawText1(ctx, text) {
  let lines = text.split('/');
  lines.forEach((line, index) => {
    ctx.fillStyle = textSetting['fontColor'];
    if (index === 0) {
      ctx.fillText(line, canvas.width / 2, 135);
    } else if (index === 1) {
      ctx.fillText(line, canvas.width / 2, 645);
    }
  });
}

function drawText2(ctx, text) {
  ctx.lineWidth = 4;
  let lines = text.split('/');

  lines.forEach((line, index) => {
    if (index === 0) {
      let words = line.split(',');
      let coordinates = [230, 220, 330, 300, 200, 320];
      ctx.strokeStyle = '#b14949';
      words.forEach((word, idx) => {
        ctx.strokeText(word, coordinates[idx * 2], coordinates[idx * 2 + 1]);

        ctx.fillStyle = textSetting['fontColor'];
        ctx.fillText(word, coordinates[idx * 2], coordinates[idx * 2 + 1]);
      });
    } else if (index === 1) {
      ctx.strokeStyle = '#75b9ff';
      ctx.strokeText(line, canvas.width / 2 + 10, 600);

      ctx.fillStyle = textSetting['fontColor'];
      ctx.fillText(line, canvas.width / 2 + 10, 600);
    }
  });
}

function drawText3(ctx, text) {
  ctx.lineWidth = 4;

  let lines = text.split('/');
  let coordinates = [
    canvas.width / 4, canvas.height / 2 - 30,
    (canvas.width * 3) / 4, canvas.height / 2 - 30,
    canvas.width / 4, canvas.height - 30,
    (canvas.width * 3) / 4, canvas.height - 30,
  ];
  lines.forEach((line, index) => {
    ctx.strokeStyle = '#000000';
    ctx.strokeText(line, coordinates[index * 2], coordinates[index * 2 + 1]);

    ctx.fillStyle = textSetting['fontColor'];
    ctx.fillText(line, coordinates[index * 2], coordinates[index * 2 + 1]);
  });
}

function drawText4(ctx, text) {
  ctx.lineWidth = 4;

  ctx.strokeStyle = '#000000';
  ctx.strokeText(text, canvas.width / 2, canvas.height - 30);

  ctx.fillStyle = textSetting['fontColor'];
  ctx.fillText(text, canvas.width / 2, canvas.height - 30);
}

function drawText(memeIndex, img, text) {
  draw(img);

  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${textSetting['fontWeight']} ${textSetting['fontSize']}px ${textSetting['fontFamily']}`;

  switch (memeIndex) {
    case 0:
      drawText1(ctx, text);
      break;
    case 1:
      drawText2(ctx, text);
      break;
    case 2:
      drawText3(ctx, text);
      break;
    case 3:
      drawText4(ctx, text);
      break
  }
}

var memeIndex = 0;
var memeImages = [
  './meme_image/말대꾸.png',
  './meme_image/개비스콘.jpg',
  './meme_image/아나킨파드메.jpg',
];
textSetting = {};
textSetting['imageIndex'] = memeIndex;
textSetting['fontFamily'] = 'Arial';
textSetting['fontSize'] = 10;
textSetting['fontColor'] = '#000000';
textSetting['fontWeight'] = 'normal';

window.onload = function () {
  var inputform = document.getElementById('inputForm');
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function () {
    draw(img);
  };
  img.src = memeImages[memeIndex];

  inputform.placeholder = 'ㅁㅁ가/말대꾸?';

  $('.form-select.memeSelect').on('change', function () {
    var selected = $('.form-select.memeSelect option:selected').val();
    switch (selected) {
      case 'meme1':
        memeIndex = 0;
        inputform.placeholder = 'ㅁㅁ가/말대꾸?';
        textSetting['fontColor'] = '#000000';
        break;
      case 'meme2':
        memeIndex = 1;
        inputform.placeholder = '야근,직장상사/퇴사';
        textSetting['fontColor'] = '#FFFFFF';
        break;
      case 'meme3':
        memeIndex = 2;
        inputform.placeholder =
          '난 세상을 바꿔보려고 해./더 좋게 바꾸려는거지?//더 좋게 바꾸려는거 맞지?';
        textSetting['fontColor'] = '#FFFFFF';
        break;
    }
    img.onload = function () {
      draw(img);
    };
    img.src = memeImages[memeIndex];
  });

  $('.form-control').change(function () {
    var text = $('.form-control').val();
    img.onload = function () {
      drawText(memeIndex, img, text);
    };
    img.src = img.src;
  });

  $('.form-select.fontSelect').on('change', function () {
    var selected = $('.form-select.fontSelect option:selected').val();
    textSetting['fontFamily'] = selected;
    let text = document.getElementById('inputForm').value;
    img.onload = function () {
      drawText(memeIndex, img, text);
    };
    img.src = img.src;
  });

  $('.form-select.fontSizeSelect').on('change', function () {
    var selected = $('.form-select.fontSizeSelect option:selected').val();
    textSetting['fontSize'] = selected;
    let text = document.getElementById('inputForm').value;
    img.onload = function () {
      drawText(memeIndex, img, text);
    };
    img.src = img.src;
  });

  $('.form-select.fontBoldSelect').on('change', function () {
    var selected = $('.form-select.fontBoldSelect option:selected').val();
    textSetting['fontWeight'] = selected;
    let text = document.getElementById('inputForm').value;
    img.onload = function () {
      drawText(memeIndex, img, text);
    };
    img.src = img.src;
  });

  var image_input = document.querySelector('#upload_image');

  image_input.addEventListener('change', (event) => {
    img.onload = function () {
      draw(img);
    };
    img.src = URL.createObjectURL(event.target.files[0]);
    inputform.placeholder = '텍스트를 입력하세요.';
    memeIndex = 3;
    textSetting['fontColor'] = '#FFFFFF';
  });
};

function download(){
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  let canvas = document.getElementById('canvas');
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace('image/png','data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();
};
