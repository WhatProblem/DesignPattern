var div = document.getElementById('pos')
div.addEventListener('click', function (e) {
    console.log(e)
    console.log(e.pageX, e.pageY)
    console.log('*******************************')
    console.log(e.screenX, e.screenY)
})