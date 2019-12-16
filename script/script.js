document.addEventListener('DOMContentLoaded', () => {
    'use strict';
   
    const client = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const clientBlock = document.querySelector('#block-customer');
    const freelancerBlock = document.querySelector('#block-freelancer');
    const choiceBlock = document.querySelector('#block-choice');

    
    client.addEventListener('click', () => {
        clientBlock.style.display = 'block';
        choiceBlock.style.display = 'none';
    });
    freelancer.addEventListener('click', () => {
        freelancerBlock.style.display = 'block';
        choiceBlock.style.display = 'none';
    });
});