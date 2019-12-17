document.addEventListener('DOMContentLoaded', () => {
    'use strict';
   
    const client = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const clientBlock = document.querySelector('#block-customer');
    const freelancerBlock = document.querySelector('#block-freelancer');
    const choiceBlock = document.querySelector('#block-choice');
    const btnExit = document.querySelector('#btn-exit');
    
    
    client.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        clientBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });
    freelancer.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        freelancerBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', ()=> {
        btnExit.style.display = 'none';
        freelancerBlock.style.display = 'none'; 
        clientBlock.style.display = 'none'; 
        choiceBlock.style.display = 'block';
    });

});