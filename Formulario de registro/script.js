function displayValues() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const displayDiv = document.getElementById('displayDiv');
    displayDiv.innerHTML = `<p>Nombre: ${name}</p><p>Email: ${email}</p>`;
    displayDiv.style.display = 'block';
}