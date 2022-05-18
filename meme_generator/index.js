function getImageHeight(val) {
  if (val === 'meme1') {
    return 776;
  } else if (val === 'meme2') {
     return 757;
  } else if (val === 'meme3') {
    return 500;
  }
}

window.onload = function() {
  var image = document.getElementById('memeImage');
  var height = getImageHeight('meme1');
  image.src = "./meme_image/말대꾸.png"
  image.height = height;

  $('.form-select.memeSelect').on('change', function () {
    var selected = $('.form-select.memeSelect option:selected').val();
    if (selected === 'meme1') {
      height = getImageHeight('meme1');
      image.src = "./meme_image/말대꾸.png"
      image.height = height;
    } else if (selected === 'meme2') {
      height = getImageHeight('meme2');
      image.src = "./meme_image/개비스콘.jpg"
      image.height = height;
    } else if (selected === 'meme3') {
      height = getImageHeight('meme3');
      image.src = "./meme_image/개비스콘.jpg"
      image.height = height;
    }
  });

  $('.form-select.fontSelect').on('change', function () {
    var selected = $('.form-select.fontSelect option:selected').val();
    console.log(selected);
  });

  $('.form-select.fontSizeSelect').on('change', function () {
    var selected = $('.form-select.fontSizeSelect option:selected').val();
    console.log(selected);
  });

  $('.form-select.fontBoldSelect').on('change', function () {
    var selected = $('.form-select.fontBoldSelect option:selected').val();
    console.log(selected);
  });
}
