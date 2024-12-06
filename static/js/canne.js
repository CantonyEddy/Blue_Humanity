document.querySelector('.pump-container').addEventListener('click', function() {
    const pump = this;
    pump.classList.add('pump-animate');
    setTimeout(() => {
        pump.classList.remove('pump-animate');
    }, 150); // Durée de l'animation en millisecondes

    const hook = document.querySelector('.hook');
    hook.classList.add('hook-animate');
    setTimeout(() => {
        hook.classList.remove('hook-animate');
    }, 1000); // Durée de l'animation de l'hameçon en millisecondes
});